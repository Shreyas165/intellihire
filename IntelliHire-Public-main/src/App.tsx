import React, { useState, useEffect } from 'react';
import { Users, UserCircle, Phone, Calendar, Building, MessageSquare, Brain, Zap, Shield, Globe, LinkedinIcon, Loader2, Eye, EyeOff } from 'lucide-react';
import Header from './components/Header';
import UserContainer from './components/UserContainer';
import FeatureBox from './components/FeatureBox';
import About from './components/About';
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { env } from './config/env';
import { API_ENDPOINTS } from './config/api';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const [showApp1, setShowApp1] = useState(false);
  const [showApp2, setShowApp2] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const fullText = "Revolutionizing the hiring process with advanced AI and intelligent matching";

  if (showApp1) {
    return <App1 />;
  }

  if (showApp2) {
    return <App2 />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/" element={
          <div className="min-h-screen bg-white">
            <Header />
            <div id="home" className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-32 relative overflow-hidden">
              {/* Animated background elements */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-white rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute top-0 left-20 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
              </div>
              <div className="container mx-auto px-4 relative z-10 flex flex-col items-center justify-center">
                <h1 className="text-7xl font-extrabold text-center mb-8 tracking-tight leading-tight">
                  Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-200">IntelliHire</span>
                </h1>
                <p className="text-2xl text-center text-white/90 max-w-3xl mx-auto leading-relaxed">
                  Revolutionizing the hiring process with advanced VOIP interviews and intelligent matching
                </p>
              </div>
            </div>
            <main className="container mx-auto px-4 py-16">
              <div className="text-center mb-20">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 tracking-tight">Transforming the Hiring Landscape</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  IntelliHire combines cutting-edge AI technology with human expertise to create a seamless, efficient, and fair hiring process for both candidates and employers.
                </p>
              </div>

              <div id="features" className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">Features</h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">Discover what makes IntelliHire unique</p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
                <FeatureBox
                  icon={Brain}
                  title="AI-Powered Matching"
                  description="Our intelligent algorithm matches candidates with the perfect opportunities based on skills, experience, and company culture."
                  gradient="from-blue-500 to-purple-600"
                  iconColor="bg-gradient-to-r from-purple-500 to-blue-500"
                />
                <FeatureBox
                  icon={Phone}
                  title="Advanced VOIP Interviews"
                  description="Crystal-clear video interviews with built-in recording and transcription capabilities."
                  gradient="from-green-500 to-teal-600"
                  iconColor="bg-gradient-to-r from-green-500 to-emerald-500"
                />
                <FeatureBox
                  icon={Zap}
                  title="Real-Time Analytics"
                  description="Get instant insights into candidate performance and interview metrics."
                  gradient="from-orange-500 to-red-600"
                  iconColor="bg-gradient-to-r from-orange-500 to-amber-500"
                />
                <FeatureBox
                  icon={Shield}
                  title="Secure Platform"
                  description="Enterprise-grade security ensuring your data and communications are protected."
                  gradient="from-indigo-500 to-blue-600"
                  iconColor="bg-gradient-to-r from-blue-500 to-indigo-500"
                />
                <FeatureBox
                  icon={Globe}
                  title="Global Reach"
                  description="Connect with talent and opportunities worldwide, breaking geographical barriers."
                  gradient="from-purple-500 to-pink-600"
                  iconColor="bg-gradient-to-r from-pink-500 to-purple-500"
                />
                <FeatureBox
                  icon={Globe}
                  title="Integrated Coding Platform"
                  description="Connect with talent and opportunities worldwide, breaking geographical barriers."
                  gradient="from-yellow-500 to-orange-600"
                  iconColor="bg-gradient-to-r from-blue-500 to-indigo-500"
                />
              </div>

              <div id="interview" className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">Interview</h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">Choose your role to get started</p>
              </div>

              <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
                <UserContainer
                  type="candidate"
                  title="For Candidates"
                  description="Find your dream job with our intelligent matching system"
                  features={[
                    { icon: Building, text: "Access to top companies" },
                    { icon: Phone, text: "Seamless VOIP interviews" },
                    { icon: Calendar, text: "Flexible scheduling" },
                    { icon: MessageSquare, text: "Real-time feedback" }
                  ]}
                  onButtonClick={() => setShowApp1(true)}
                />
                <UserContainer
                  type="interviewer"
                  title="For Interviewers"
                  description="Streamline your hiring process with advanced tools"
                  features={[
                    { icon: Users, text: "Smart candidate matching" },
                    { icon: Phone, text: "Professional VOIP system" },
                    { icon: Calendar, text: "Interview management" },
                    { icon: UserCircle, text: "Candidate tracking" }
                  ]}
                  onButtonClick={() => setShowApp2(true)}
                />
              </div>
            </main>
          </div>
        } />
      </Routes>
    </Router>
  );
}

function App1() {
  const [isSignUp, setIsSignUp] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    linkedinUrl: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const endpoint = isSignUp ? '/api/auth/register' : '/api/auth/login';
      const response = await fetch(`${env.apiBaseUrl}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.message === 'User already exists') {
          // If user exists, switch to login form
          setIsSignUp(false);
          setFormData({ name: '', email: formData.email, password: formData.password, linkedinUrl: '' });
          return;
        }
        throw new Error(data.message || 'Authentication failed');
      }

      console.log(isSignUp ? 'Registration successful' : 'Login successful', data);
      
      if (isSignUp) {
        // After successful registration, switch to sign in form
        setIsSignUp(false);
        setFormData({ name: '', email: '', password: '', linkedinUrl: '' });
      } else {
        // After successful login, redirect to external link
        window.location.href = 'https://finalcorefeature-production.up.railway.app/candidate';
      }
    } catch (error) {
      console.error('Authentication error:', error);
      // You might want to show an error message to the user here
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
    setIsSubmitting(true);
    try {
      const response = await fetch(`${env.apiBaseUrl}/api/auth/google`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ credential: credentialResponse.credential }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Google authentication failed');
      }

      const data = await response.json();
      console.log('Google authentication successful', data);
      setSubmitted(true);
    } catch (error) {
      console.error('Google authentication error:', error);
      // You might want to show an error message to the user here
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleError = () => {
    console.error('Google login failed');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
          <div className="mb-6 text-green-500">
            <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {isSignUp ? 'Registration Successful!' : 'Login Successful!'}
          </h2>
          <p className="text-gray-600">
            {isSignUp
              ? "Thank you for registering. We'll review your application and get back to you soon."
              : "Welcome back! You've been successfully logged in."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </h2>
          <p className="text-gray-600">
            {isSignUp ? 'Please fill out the form to register' : 'Please sign in to continue'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {isSignUp && (
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required={isSignUp}
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              />
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {isSignUp && (
            <div>
              <label htmlFor="linkedinUrl" className="block text-sm font-medium text-gray-700 mb-1">
                LinkedIn Profile URL
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LinkedinIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="url"
                  id="linkedinUrl"
                  name="linkedinUrl"
                  required={isSignUp}
                  value={formData.linkedinUrl}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors disabled:opacity-50"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                {isSignUp ? 'Creating Account...' : 'Signing In...'}
              </span>
            ) : (
              isSignUp ? 'Create Account' : 'Sign In'
            )}
          </button>
        </form>

        <div className="mt-8 space-y-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or</span>
            </div>
          </div>

          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              useOneTap
            />
          </div>

          <div className="text-center">
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
            >
              {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function App2() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(API_ENDPOINTS.auth.interviewerLogin, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Invalid credentials');
      }

      // Store the token
      localStorage.setItem('interviewerToken', data.token);
      console.log('Login successful');
      
      // Redirect to the specified URL
      if (data.redirectUrl) {
        window.location.href = data.redirectUrl;
      }
    } catch (err: unknown) {
      console.error('Login error:', err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Interviewer Login
          </h2>
          <p className="text-gray-600">
            Please enter your credentials to continue
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors disabled:opacity-50"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                Signing In...
              </span>
            ) : (
              'Sign In'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;