# Prompt the user to enter the commit message
$message = Read-Host "Enter commit message:"

# Add all changes to the staging area
git add .

# Commit changes with the provided message
git commit -m $message

git push origin main