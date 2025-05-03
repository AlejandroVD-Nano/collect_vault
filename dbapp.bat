@echo off
REM Inicia el servidor y abre el navegador
start cmd /k "npm start"
timeout /t 5 >nul  && start "" "http://localhost:8081"