Migrations:

```powershell
dotnet ef migrations script --project src/Chat.DB --startup-project src/Chat.Api --context ChatDBContext

dotnet ef migrations add <migration_name> --project src/Chat.DB --startup-project src/Chat.Api --context ChatDBContext

dotnet ef database update --project src/Chat.DB --startup-project src/Chat.Api --context ChatDBContext
```

Mysql DB commands:
- backup:
```powershell
docker exec chat-mysql mysqldump -u root -proot chatdb > src/Chat.DB/Data/Backup/chatdb_backup_"$(Get-Date -Format 'yyyyMMdd_HHmmss')".sql
```
- restore:
```powershell
docker exec -i chat-mysql mysql -u root -proot chatdb < ./src/Chat.DB/Data/Backup/chatdb_backup_<timestamp>.sql
```
- drop:
```powershell
docker exec -i chat-mysql mysql -u root -proot -e "DROP DATABASE IF EXISTS chatdb; CREATE DATABASE chatdb;"
```