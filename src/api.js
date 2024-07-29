export const login = (email, password) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.email === email && user.password === password) {
      return true;
    }
    return false;
  };
  
  export const register = (email, password) => {
    const user = { email, password };
    localStorage.setItem('user', JSON.stringify(user));
  };
  
  export const fetchAccountInfo = () => {
    return JSON.parse(localStorage.getItem('user'));
  };
  