## Transfer Book v2

### Overview
Transfer Book 2 is a simple expense tracker, built using Django and React.js and can be used for managing financial records. It allows users to keep track of their expenses and incomes conveniently.

### Features
1. **User Authentication**: Users can register, log in, and log out securely.
2. **Record Management**: Users can add, view, edit, and delete their financial records.
3. **Data Security:**: User data is stored securely, and access is protected using authentication mechanisms.
4. **Intuitive Interface**: The user interface is designed to be user-friendly and intuitive, making it easy for users to navigate and use the application.

### Technologies Uesd:
1. **Frontend**: React.js, Axios
2. **Backend**: Django
3. **API**: Django REST Framework, Custom Middleware
4. **Authentication**: JSON Web Tokens

### Installation:

**Step 1.** Clone the repository:
```
git clone https://github.com/themerovingian03/transfer_book2.git
```

**Step 2.** Change working directory:
```
cd transfer_book2
```

**Step 3.** Start the backend server First install dependencies: 
```
cd backend
python3 -m venv myenv
myenv\Scripts\activate
pip install -r requirements.txt
```
Run the server

```
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```
**Step 4.** CD back to ```transfer_book2``` directory:
```
cd..
cd..
```

**Step 5.** Install frontend dependencies and run:
```
cd frontend/react-app
npm install
npm start
```

### Usage:
After starting, open localhost on port 3000 and *sign in* using /register endpoint. Next, you can immediately start managing your finances.
