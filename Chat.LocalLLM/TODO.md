## TODOS:
* removed the manually downloaded models, most of them were not working with huggingface/text-generation-inference
* Make the huggingface/text-generation-inference work with some quantized model
* Make HuggingFaceTB/SmolLM3-3B work. probably need a custom server for it to work...
* Made custom server using transformers.js but it doesn't work with the model gpt2. figure out why
* ESbuild doesn't work because it doesn't emit the decorator info. Reverted back to tsc for now.
