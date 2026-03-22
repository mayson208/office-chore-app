@echo off
echo ==========================================
echo  Office Chore App - Starting...
echo ==========================================

:: Set your email settings here, or set them as Windows environment variables
:: Get a Gmail App Password at: Account -> Security -> 2-Step Verification -> App passwords
if "%MAIL_USERNAME%"=="" set MAIL_USERNAME=your-email@gmail.com
if "%MAIL_PASSWORD%"=="" set MAIL_PASSWORD=your-app-password
if "%APP_BASE_URL%"=="" set APP_BASE_URL=http://localhost:8080

:: Build the JAR if it doesn't exist
if not exist "target\office-chore-app-1.0.0.jar" (
    echo Building application (first time takes a few minutes)...
    call mvn clean package -DskipTests -q
)

echo Starting app on http://localhost:8080
echo Press Ctrl+C to stop.
echo.

java -jar target\office-chore-app-1.0.0.jar ^
    --spring.mail.username=%MAIL_USERNAME% ^
    --spring.mail.password=%MAIL_PASSWORD% ^
    --app.base-url=%APP_BASE_URL%
