import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

export default function LoginPage() {
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error for this field when user types
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // ✅ BETTER EMAIL VALIDATION
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else {
      // Check basic format
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      } else {
        // Check for common email domains (optional, but good UX)
        const domain = formData.email.split('@')[1];
        const commonDomains = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'icloud.com', 'student.com', 'edu'];
        const isCommonDomain = commonDomains.some(d => domain.includes(d));
        
        // Warning for uncommon domains (not an error, but good to check)
        if (!isCommonDomain && isSignup) {
          // You could add a warning here, but for now we'll be lenient
          // Just check it's not obviously fake (no spaces, has real TLD)
          if (domain.includes(' ') || domain.split('.').pop().length < 2) {
            newErrors.email = 'Please enter a valid email address';
          }
        }
      }
    }

    // ✅ BETTER PASSWORD VALIDATION
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else {
      if (formData.password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters';
      } else if (isSignup) {
        // Additional checks for signup
        const hasLetter = /[a-zA-Z]/.test(formData.password);
        const hasNumber = /[0-9]/.test(formData.password);
        
        if (!hasLetter || !hasNumber) {
          newErrors.password = 'Password must contain both letters and numbers';
        }
        
        // Check for weak passwords
        const weakPasswords = ['123456', 'password', 'qwerty', 'abc123', '111111', 'aaaaaa'];
        if (weakPasswords.includes(formData.password.toLowerCase())) {
          newErrors.password = 'This password is too common. Choose a stronger one.';
        }
      }
    }

    // Confirm password validation (only for signup)
    if (isSignup) {
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsLoading(true);
      
      // Simulate API call (will be real Firebase tomorrow)
      setTimeout(() => {
        console.log('Form is valid!', formData);
        alert(`${isSignup ? 'Signup' : 'Login'} will be implemented tomorrow!`);
        setIsLoading(false);
      }, 1500);
    }
  };

  const toggleMode = () => {
    setIsSignup(!isSignup);
    setFormData({ email: '', password: '', confirmPassword: '' });
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4 animate-bounce">🎓</div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            BunkMate AI
          </h1>
          <p className="text-gray-600">
            Your attendance, sorted. 📚
          </p>
        </div>

        {/* Login/Signup Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 animate-fadeIn">
          
          {/* ✅ FIXED TOGGLE TABS */}
          <div className="flex gap-2 bg-gray-100 rounded-2xl p-1 mb-6">
            <button
              type="button"
              onClick={() => setIsSignup(false)}
              className={`flex-1 py-3 rounded-xl font-semibold transition-all duration-300 ${
                !isSignup
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => setIsSignup(true)}
              className={`flex-1 py-3 rounded-xl font-semibold transition-all duration-300 ${
                isSignup
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* ✅ CLEAN EMAIL INPUT (no duplicates) */}
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your.email@gmail.com"
              label="Email"
              error={errors.email}
              icon={Mail}
            />

            {/* ✅ CLEAN PASSWORD INPUT (no duplicates) */}
            <Input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              label="Password"
              error={errors.password}
              icon={Lock}
              rightIcon={showPassword ? EyeOff : Eye}
              onRightIconClick={() => setShowPassword(!showPassword)}
            />

            {/* Confirm Password (only for signup) */}
            {isSignup && (
              <Input
                type={showPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                label="Confirm Password"
                error={errors.confirmPassword}
                icon={Lock}
              />
            )}

            {/* Password hint (only for signup) */}
            {isSignup && !errors.password && formData.password.length > 0 && (
              <p className="text-xs text-gray-500 -mt-2 ml-1">
                💡 Use at least 6 characters with letters and numbers
              </p>
            )}

            {/* ✅ SUBMIT BUTTON WITH LOADING */}
            <Button type="submit" fullWidth disabled={isLoading}>
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Loading...
                </span>
              ) : (
                isSignup ? 'Create Account 🚀' : 'Login ✨'
              )}
            </Button>
          </form>

          {/* Footer Text */}
          <p className="text-center text-gray-500 text-sm mt-6">
            {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              type="button"
              onClick={toggleMode}
              className="text-purple-600 font-semibold hover:underline"
            >
              {isSignup ? 'Login' : 'Sign Up'}
            </button>
          </p>
        </div>

        {/* Bottom Note */}
        <p className="text-center text-gray-500 text-sm mt-6">
          Made with 💜 for students who actually track attendance
        </p>
      </div>
    </div>
  );
}