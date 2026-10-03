@echo off
echo ========================================================
echo   Launching Rocket Llama Labs Visual Identity Suite
echo   Running on http://localhost:5000
echo ========================================================
start "" http://localhost:5000
python -m http.server 5000
