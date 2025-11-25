// generate-types.js
// Usage: node generate-types.js https://example.com/swagger.json

const fetch = globalThis.fetch || (await import('node-fetch')).default; // for Node <18, install node-fetch

if (process.argv.length < 3) {
  console.error('Usage: node generate-types-http.js <swagger_url>');
  process.exit(1);
}

const swaggerUrl = process.argv[2];

function resolveRef(ref, schemas) {
  const refName = ref.replace('#/components/schemas/', '');
  if (!schemas[refName]) {
    console.warn(`Warning: schema ${refName} not found`);
    return 'any';
  }
  return refName;
}

function tsType(schema, schemas) {
  if (!schema) return 'any';

  if (schema.$ref) {
    return resolveRef(schema.$ref, schemas);
  }

  if (schema.enum) {
    return schema.enum.map((v) => JSON.stringify(v)).join(' | ');
  }

  switch (schema.type) {
    case 'string':
    case 'boolean':
    case 'number':
      return schema.type;
    case 'integer':
      return 'number';
    case 'array':
      return `${tsType(schema.items, schemas)}[]`;
    case 'object':
      if (!schema.properties) return '{ [key: string]: any }';
      return (
        '{\n' +
        Object.entries(schema.properties)
          .map(([key, val]) => {
            const optional = schema.required && !schema.required.includes(key);
            return `  ${key}${optional ? '?' : ''}: ${tsType(val, schemas)};`;
          })
          .join('\n') +
        '\n}'
      );
    default:
      if (schema.allOf) return schema.allOf.map((s) => tsType(s, schemas)).join(' & ');
      if (schema.oneOf) return schema.oneOf.map((s) => tsType(s, schemas)).join(' | ');
      if (schema.anyOf) return schema.anyOf.map((s) => tsType(s, schemas)).join(' | ');
      return 'any';
  }
}

const seen = new Set();
function generateInterface(name, schema, schemas) {
  if (seen.has(name)) return '';
  seen.add(name);

  let out = '';

  // Generate dependencies first
  if (schema.properties) {
    for (const prop of Object.values(schema.properties)) {
      if (prop.$ref) {
        const refName = resolveRef(prop.$ref, schemas);
        if (!seen.has(refName)) {
          out += generateInterface(refName, schemas[refName], schemas);
        }
      }
      if (prop.type === 'array' && prop.items?.$ref) {
        const refName = resolveRef(prop.items.$ref, schemas);
        if (!seen.has(refName)) {
          out += generateInterface(refName, schemas[refName], schemas);
        }
      }
    }
  }

  if (schema.allOf) {
    for (const subschema of schema.allOf) {
      if (subschema.$ref) {
        const refName = resolveRef(subschema.$ref, schemas);
        if (!seen.has(refName)) {
          out += generateInterface(refName, schemas[refName], schemas);
        }
      }
    }
  }

  // Generate current interface
  if (schema.type === 'object' || schema.properties || schema.allOf) {
    out += `export interface ${name} ${tsType(schema, schemas)}\n\n`;
  } else {
    out += `export type ${name} = ${tsType(schema, schemas)};\n\n`;
  }

  return out;
}

async function main() {
  try {
    const res = await fetch(swaggerUrl);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const openapi = await res.json();
    const schemas = openapi.components?.schemas || {};

    let result = '';
    for (const [name, schema] of Object.entries(schemas)) {
      result += generateInterface(name, schema, schemas);
    }

    console.log(result);
  } catch (err) {
    console.error('Failed to fetch or process OpenAPI spec:', err);
  }
}

main();
