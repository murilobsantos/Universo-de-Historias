import React, { useState, useEffect } from "react";
import AuthorRegistration from "../components/AuthorRegistration";
import ReaderRegistration from "../components/ReaderRegistration";
import useAuthors from "../hooks/useAuthors";
import { useReaders } from "../hooks/useReaders";
import { useDarkMode } from "../contexts/DarkModeContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState<'author' | 'reader'>('author');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [message, setMessage] = useState("");
  const [loginType, setLoginType] = useState<'author' | 'reader'>('author');
  const { currentAuthor, logout, login: loginAuthor } = useAuthors();
  const { currentReader, login: loginReader } = useReaders();
  const { isDarkMode } = useDarkMode();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentAuthor || currentReader) {
      navigate("/home");
    }
  }, [currentAuthor, currentReader, navigate]);

  const toggleView = () => {
    setIsLogin(!isLogin);
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 6;
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    if (value && !validateEmail(value)) {
      setEmailError("Email inválido");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    if (value && !validatePassword(value)) {
      setPasswordError("Senha deve ter pelo menos 6 caracteres");
    } else {
      setPasswordError("");
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    if (!validateEmail(email) || !validatePassword(password)) {
      setMessage("Por favor, corrija os erros acima.");
      return;
    }
    if (loginType === 'author') {
      const author = loginAuthor(email.trim(), password.trim());
      if (author) {
        setMessage("Login bem-sucedido!");
        setEmail("");
        setPassword("");
        navigate("/home");
        return;
      }
    } else {
      if (loginReader(email.trim(), password.trim())) {
        setMessage("Login bem-sucedido!");
        setEmail("");
        setPassword("");
        navigate("/home");
        return;
      }
    }
    setMessage("Email ou senha inválidos.");
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gradient-to-b from-cosmic-dark via-cosmic-deep to-cosmic-dark' : 'bg-backgroundLight'} flex flex-col items-center justify-center ${isDarkMode ? 'text-white' : 'text-black'} p-4 relative overflow-hidden`}>
      {/* Background with stars */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-2 h-2 bg-white rounded-full animate-pulse"></div>
        <div className="absolute top-20 right-20 w-1 h-1 bg-white rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-20 w-1.5 h-1.5 bg-white rounded-full animate-pulse delay-500"></div>
        <div className="absolute top-1/2 left-1/4 w-1 h-1 bg-white rounded-full animate-pulse delay-1500"></div>
        <div className="absolute bottom-10 right-10 w-2 h-2 bg-white rounded-full animate-pulse delay-2000"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-white rounded-full animate-pulse delay-2500"></div>
        {/* Story line connecting elements */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M10 10 Q50 30 90 10 Q70 50 90 90 Q50 70 10 90 Q30 50 10 10" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" fill="none" />
        </svg>
      </div>

      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 max-w-md w-full shadow-2xl border border-white/20 relative z-10">
        {/* Login/Register Toggle */}
        <div className="flex justify-center mb-6 space-x-4">
          <button
            onClick={() => setIsLogin(true)}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              isLogin ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg" : "text-gray-400 hover:text-white"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              !isLogin ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg" : "text-gray-400 hover:text-white"
            }`}
          >
            Register
          </button>
        </div>

        {isLogin ? (
          <>
            <h3 className="text-xl font-semibold mb-4 text-center">Entrar na Biblioteca</h3>
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={handleEmailChange}
                  className={`w-full p-3 border rounded-xl bg-white/10 text-white placeholder-white/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition ${
                    emailError ? 'border-red-500' : 'border-white/30'
                  }`}
                  required
                />
                {emailError && <p className="text-red-400 text-sm mt-1">{emailError}</p>}
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Senha"
                  value={password}
                  onChange={handlePasswordChange}
                  className={`w-full p-3 border rounded-xl bg-white/10 text-white placeholder-white/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition ${
                    passwordError ? 'border-red-500' : 'border-white/30'
                  }`}
                  required
                />
                {passwordError && <p className="text-red-400 text-sm mt-1">{passwordError}</p>}
              </div>
              <div className="flex items-center justify-center space-x-4 text-sm">
                <span className={loginType === 'author' ? 'text-white' : 'text-gray-400'}>Autor</span>
                <button
                  type="button"
                  onClick={() => setLoginType(loginType === 'author' ? 'reader' : 'author')}
                  className="relative w-12 h-6 bg-white/20 rounded-full transition-colors duration-300"
                >
                  <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-300 ${loginType === 'reader' ? 'translate-x-6' : ''}`}></div>
                </button>
                <span className={loginType === 'reader' ? 'text-white' : 'text-gray-400'}>Leitor</span>
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 rounded-xl hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 transform active:scale-95"
              >
                Entrar
              </button>
            </form>
            {message && <p className={`mt-4 text-center ${message.includes('bem-sucedido') ? 'text-green-400' : 'text-red-400'}`}>{message}</p>}
          </>
        ) : (
          <>
            {/* User Type Toggle for Register */}
            <div className="flex justify-center mb-6 space-x-4">
              <button
                onClick={() => setUserType('author')}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  userType === 'author' ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white" : "text-gray-400 hover:text-white"
                }`}
              >
                Autor
              </button>
              <button
                onClick={() => setUserType('reader')}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  userType === 'reader' ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white" : "text-gray-400 hover:text-white"
                }`}
              >
                Leitor
              </button>
            </div>

            {userType === 'author' ? <AuthorRegistration /> : <ReaderRegistration />}
          </>
        )}

        <div className="mt-4 text-center text-gray-400">
          <button onClick={toggleView} className="underline hover:text-white transition">
            {isLogin ? "Não tem conta? Registre-se" : "Já tem conta? Faça login"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
