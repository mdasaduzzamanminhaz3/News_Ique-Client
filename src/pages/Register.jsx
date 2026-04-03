import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import useAuthContext from "../hooks/useAuthContext";
import ErrorAlert from "../components/ErrorAlert";
import { useState } from "react";
import { User, Mail, Phone, Lock, UserPlus, Loader2, ArrowRight, CheckCircle2 } from "lucide-react";

const Register = () => {
    const { registerUser, error } = useAuthContext();
    const [successMsg, setSuccessMsg] = useState("");
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    
    const { register, handleSubmit, formState: { errors }, watch } = useForm();

    const onSubmit = async (data) => {
        delete data.confirm_password;
        setLoading(true);
        try {
            const response = await registerUser(data);
            if (response.success) {
                setSuccessMsg(response.message || "Account created successfully!");
                setTimeout(() => navigate("/login"), 3000);
            }
        } catch (err) {
            console.log("Registration Failed", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative flex items-center justify-center min-h-screen bg-[#020617] overflow-hidden py-12 px-4">
            
            {/* Background 3D Glows */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-600/10 blur-[140px] rounded-full animate-pulse"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-600/10 blur-[140px] rounded-full animate-pulse delay-700"></div>
            </div>

            <div className="relative z-10 w-full max-w-2xl">
                {/* Glassmorphism Card */}
                <div className="bg-white/5 backdrop-blur-2xl border border-white/10 shadow-2xl rounded-[2.5rem] p-8 md:p-12 transition-all duration-500 hover:shadow-blue-500/10">
                    
                    {/* Header */}
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4 shadow-lg shadow-blue-500/40 -rotate-3 hover:rotate-0 transition-transform duration-300">
                            <UserPlus className="text-white w-8 h-8" />
                        </div>
                        <h2 className="text-3xl font-black text-white tracking-tighter">
                            Join <span className="text-blue-500">NewsIque</span>
                        </h2>
                        <p className="text-gray-400 text-sm mt-2 font-medium">
                            Create an account to personalize your news feed
                        </p>
                    </div>

                    {/* Alerts */}
                    <div className="mb-6 space-y-4">
                        {error && <ErrorAlert error={error} />}
                        {successMsg && (
                            <div className="flex items-center gap-3 bg-green-500/10 border border-green-500/20 text-green-400 p-4 rounded-2xl animate-in fade-in slide-in-from-top-4">
                                <CheckCircle2 className="shrink-0" size={20} />
                                <span className="text-sm font-bold">{successMsg}</span>
                            </div>
                        )}
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        
                        {/* Name Group (Row) */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* First Name */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">First Name</label>
                                <div className="relative group">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-500 transition-colors" size={18} />
                                    <input
                                        {...register("first_name", { required: "First Name is required" })}
                                        className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-white/10 transition-all text-sm"
                                        placeholder="John"
                                    />
                                </div>
                                {errors.first_name && <p className="text-red-500 text-[10px] font-bold mt-1 ml-1">{errors.first_name.message}</p>}
                            </div>

                            {/* Last Name */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Last Name</label>
                                <div className="relative group">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-500 transition-colors" size={18} />
                                    <input
                                        {...register("last_name", { required: "Last Name is required" })}
                                        className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-white/10 transition-all text-sm"
                                        placeholder="Doe"
                                    />
                                </div>
                                {errors.last_name && <p className="text-red-500 text-[10px] font-bold mt-1 ml-1">{errors.last_name.message}</p>}
                            </div>
                        </div>

                        {/* Email & Phone Group */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Email Address</label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-500 transition-colors" size={18} />
                                    <input
                                        {...register("email", { required: "Email is required" })}
                                        type="email"
                                        className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-white/10 transition-all text-sm"
                                        placeholder="john@example.com"
                                    />
                                </div>
                                {errors.email && <p className="text-red-500 text-[10px] font-bold mt-1 ml-1">{errors.email.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Phone Number</label>
                                <div className="relative group">
                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-500 transition-colors" size={18} />
                                    <input
                                        {...register("phone_number")}
                                        className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-white/10 transition-all text-sm"
                                        placeholder="+880 1xxx..."
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Password Group */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Password</label>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-500 transition-colors" size={18} />
                                    <input
                                        {...register("password", { 
                                            required: "Password is required",
                                            minLength: { value: 8, message: "At least 8 characters" }
                                        })}
                                        type="password"
                                        className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-white/10 transition-all text-sm"
                                        placeholder="••••••••"
                                    />
                                </div>
                                {errors.password && <p className="text-red-500 text-[10px] font-bold mt-1 ml-1">{errors.password.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Confirm Password</label>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-500 transition-colors" size={18} />
                                    <input
                                        {...register("confirm_password", { 
                                            required: "Confirm your password",
                                            validate: (val) => val === watch("password") || "Passwords do not match"
                                        })}
                                        type="password"
                                        className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-white/10 transition-all text-sm"
                                        placeholder="••••••••"
                                    />
                                </div>
                                {errors.confirm_password && <p className="text-red-500 text-[10px] font-bold mt-1 ml-1">{errors.confirm_password.message}</p>}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full relative group overflow-hidden bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-2xl transition-all shadow-lg shadow-blue-600/30 active:scale-[0.98] disabled:opacity-70 mt-4"
                        >
                            <div className="relative z-10 flex items-center justify-center gap-2 uppercase tracking-widest text-sm">
                                {loading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Creating Account...
                                    </>
                                ) : (
                                    <>
                                        Register Now
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                        </button>
                    </form>

                    {/* Login Link */}
                    <div className="text-center mt-10 border-t border-white/5 pt-8">
                        <p className="text-gray-400 text-sm">
                            Already part of the community?{" "}
                            <Link to="/login" className="text-white font-bold hover:text-blue-500 transition-colors underline decoration-blue-500/30 underline-offset-4">
                                Sign In
                            </Link>
                        </p>
                    </div>
                </div>

                <p className="text-center text-gray-600 text-[10px] mt-8 uppercase tracking-[0.3em] font-black opacity-40">
                    Trusted by 50,000+ Readers Globally
                </p>
            </div>
        </div>
    );
};

export default Register;