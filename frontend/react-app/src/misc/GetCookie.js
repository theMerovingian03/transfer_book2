const GetCookie = () => {
    function getCookieValue(cookieName) {
        // Split document.cookie string into individual cookies
        const cookies = document.cookie.split('; ');
        console.log(cookies[0]);


        // Find the cookie with the given name
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i];
            const [name, value] = cookie.split('=');

            if (name === cookieName) {
                return value;
            }
        }

        // If the cookie is not found, return null
        return null;
    }
    // Handler function for button click
    const handleButtonClick = () => {
        const cookieValue = getCookieValue('jwt');
        console.log("Cookie value: ", cookieValue);
    };

    return (
        <button onClick={handleButtonClick}>
            Get JWT Cookie Value
        </button>
    );
}

export default GetCookie;