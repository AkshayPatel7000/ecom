@echo off
echo "Start Copy"
cd ..
echo "%cd%\patches\index.js" 
copy /Y "%cd%\patches\index.js" "%cd%\node_modules\react-native\index.js"
echo "Done Copy"