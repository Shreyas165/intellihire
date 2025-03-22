import React from 'react';
import { Users, Target, Award, Heart } from 'lucide-react';

const About: React.FC = () => {
    return (
        <div className="min-h-screen bg-white">
            <div className="container mx-auto px-4 py-16 pt-32">
                {/* Hero Section */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold text-gray-900 mb-4 hover:scale-105 transition-transform duration-300">
                        About IntelliHire
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Revolutionizing the hiring process with advanced AI and intelligent matching to connect the right talent with the right opportunities.
                    </p>
                </div>

                {/* Mission Section */}
                <div className="grid md:grid-cols-2 gap-8 mb-16">
                    <div className="group relative overflow-hidden rounded-xl bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl">
                        <div className="flex items-center mb-6">
                            <Target className="h-12 w-12 text-indigo-500 mr-4 group-hover:scale-110 transition-transform duration-300" />
                            <h2 className="text-2xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors duration-300">Our Mission</h2>
                        </div>
                        <p className="text-gray-600 group-hover:text-gray-900 transition-colors duration-300">
                            To transform the hiring landscape by leveraging cutting-edge AI technology to create meaningful connections between talented professionals and innovative companies.
                        </p>
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 to-purple-500/0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-xl" />
                    </div>

                    <div className="group relative overflow-hidden rounded-xl bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl">
                        <div className="flex items-center mb-6">
                            <Award className="h-12 w-12 text-purple-500 mr-4 group-hover:scale-110 transition-transform duration-300" />
                            <h2 className="text-2xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors duration-300">Our Vision</h2>
                        </div>
                        <p className="text-gray-600 group-hover:text-gray-900 transition-colors duration-300">
                            To become the world's leading AI-powered hiring platform, setting new standards for efficiency, fairness, and success in talent acquisition.
                        </p>
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 to-purple-500/0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-xl" />
                    </div>
                </div>

                {/* Values Section */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Core Values</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="group relative overflow-hidden rounded-xl bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl">
                            <div className="flex items-center mb-4">
                                <Users className="h-8 w-8 text-green-500 mr-3 group-hover:scale-110 transition-transform duration-300" />
                                <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors duration-300">Innovation</h3>
                            </div>
                            <p className="text-gray-600 group-hover:text-gray-900 transition-colors duration-300">
                                Constantly pushing boundaries with cutting-edge AI technology to revolutionize the hiring process.
                            </p>
                            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 to-purple-500/0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-xl" />
                        </div>

                        <div className="group relative overflow-hidden rounded-xl bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl">
                            <div className="flex items-center mb-4">
                                <Heart className="h-8 w-8 text-red-500 mr-3 group-hover:scale-110 transition-transform duration-300" />
                                <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors duration-300">Integrity</h3>
                            </div>
                            <p className="text-gray-600 group-hover:text-gray-900 transition-colors duration-300">
                                Maintaining the highest standards of transparency and fairness in all our operations.
                            </p>
                            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 to-purple-500/0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-xl" />
                        </div>

                        <div className="group relative overflow-hidden rounded-xl bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl">
                            <div className="flex items-center mb-4">
                                <Target className="h-8 w-8 text-blue-500 mr-3 group-hover:scale-110 transition-transform duration-300" />
                                <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors duration-300">Excellence</h3>
                            </div>
                            <p className="text-gray-600 group-hover:text-gray-900 transition-colors duration-300">
                                Committed to delivering exceptional results and experiences for both candidates and employers.
                            </p>
                            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 to-purple-500/0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-xl" />
                        </div>
                    </div>
                </div>

                {/* Team Section */}
                <div className="group relative overflow-hidden rounded-xl bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-8 group-hover:text-indigo-600 transition-colors duration-300">Our Team</h2>
                    <p className="text-gray-600 text-center max-w-2xl mx-auto group-hover:text-gray-900 transition-colors duration-300">
                        We are a diverse team of passionate individuals dedicated to transforming the hiring landscape. Our expertise spans AI, software engineering, and human resources, working together to create innovative solutions.
                    </p>
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 to-purple-500/0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-xl" />
                </div>
            </div>
        </div>
    );
};

export default About;