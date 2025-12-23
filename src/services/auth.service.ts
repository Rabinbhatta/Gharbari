import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import User, { IUser } from "../models/User";
import { sendMail } from "../utils/mail";
import { JWT_EXPIRES_IN } from "../config/jwt";
import dotenv from "dotenv";

dotenv.config();

interface RegisterInput {
  fullName: string;
  email: string;
  phone: string;
  password: string;
}

interface LoginInput {
  email: string;
  password: string;
}

const createToken = (userId: string): string => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET as string, {
    expiresIn: JWT_EXPIRES_IN,
  });
};

// Email Template Helper
const getEmailTemplate = (content: string) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>GharBari</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f7fa;">
      <table role="presentation" style="width: 100%; border-collapse: collapse;">
        <tr>
          <td align="center" style="padding: 40px 0;">
            <table role="presentation" style="width: 600px; border-collapse: collapse; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
              
              <!-- Header -->
              <tr>
                <td style="padding: 40px 40px 30px 40px; text-align: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 12px 12px 0 0;">
                  <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: 700; letter-spacing: -0.5px;">
                    🏠 GharBari
                  </h1>
                  <p style="margin: 8px 0 0 0; color: #e0e7ff; font-size: 14px;">Your Trusted Property Partner</p>
                </td>
              </tr>
              
              <!-- Content -->
              <tr>
                <td style="padding: 40px;">
                  ${content}
                </td>
              </tr>
              
              <!-- Footer -->
              <tr>
                <td style="padding: 30px 40px; background-color: #f8fafc; border-radius: 0 0 12px 12px; text-align: center;">
                  <p style="margin: 0 0 10px 0; color: #64748b; font-size: 14px;">
                    Need help? Contact us at 
                    <a href="mailto:support@gharbari.com" style="color: #667eea; text-decoration: none;">support@gharbari.com</a>
                  </p>
                  <p style="margin: 0; color: #94a3b8; font-size: 12px;">
                    © ${new Date().getFullYear()} GharBari. All rights reserved.
                  </p>
                  <div style="margin-top: 15px;">
                    <a href="#" style="display: inline-block; margin: 0 5px; color: #94a3b8; text-decoration: none; font-size: 12px;">Privacy Policy</a>
                    <span style="color: #cbd5e1;">•</span>
                    <a href="#" style="display: inline-block; margin: 0 5px; color: #94a3b8; text-decoration: none; font-size: 12px;">Terms of Service</a>
                  </div>
                </td>
              </tr>
              
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
};

// ================= REGISTER =================
export const registerUser = async (data: RegisterInput): Promise<IUser> => {
  const { fullName, email, phone, password } = data;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("Email already registered");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const verificationToken = crypto.randomBytes(32).toString("hex");

  const user = await User.create({
    fullName,
    email,
    phone,
    password: hashedPassword,
    emailVerificationToken: verificationToken,
    emailVerificationExpires: new Date(Date.now() + 24 * 60 * 60 * 1000),
  });

  const emailContent = `
    <div style="text-align: center; margin-bottom: 30px;">
      <div style="display: inline-block; padding: 12px 24px; background-color: #f0fdf4; border-radius: 8px; border: 1px solid #bbf7d0;">
        <span style="color: #16a34a; font-size: 16px; font-weight: 600;">✓ Account Created Successfully</span>
      </div>
    </div>
    
    <h2 style="margin: 0 0 16px 0; color: #1e293b; font-size: 24px; font-weight: 600;">Welcome to GharBari, ${fullName}! 👋</h2>
    
    <p style="margin: 0 0 24px 0; color: #475569; font-size: 16px; line-height: 1.6;">
      Thank you for joining GharBari. We're excited to help you find your perfect property or connect with potential buyers.
    </p>
    
    <p style="margin: 0 0 24px 0; color: #475569; font-size: 16px; line-height: 1.6;">
      To get started, please verify your email address by using the verification token below:
    </p>
    
    <div style="background-color: #f8fafc; border-left: 4px solid #667eea; padding: 20px; border-radius: 8px; margin: 24px 0;">
      <p style="margin: 0 0 8px 0; color: #64748b; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Your Verification Token</p>
      <p style="margin: 0; color: #1e293b; font-size: 18px; font-family: 'Courier New', monospace; font-weight: 600; word-break: break-all;">
        ${verificationToken}
      </p>
    </div>
    
    <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 16px; border-radius: 8px; margin: 24px 0;">
      <p style="margin: 0; color: #92400e; font-size: 14px; line-height: 1.5;">
        ⚠️ <strong>Important:</strong> This token will expire in 24 hours. Please verify your email as soon as possible.
      </p>
    </div>
    
    <p style="margin: 24px 0 0 0; color: #64748b; font-size: 14px; line-height: 1.6;">
      If you didn't create this account, please ignore this email or contact our support team.
    </p>
  `;

  await sendMail({
    to: email,
    subject: "Welcome to GharBari - Verify Your Email",
    html: getEmailTemplate(emailContent),
  });

  return user;
};

// ================= VERIFY EMAIL =================
export const verifyEmail = async (token: string): Promise<void> => {
  const user = await User.findOne({
    emailVerificationToken: token,
    emailVerificationExpires: { $gt: new Date() },
  });

  if (!user) {
    throw new Error("Invalid or expired verification token");
  }

  user.isVerified = true;
  user.emailVerificationToken = undefined;
  user.emailVerificationExpires = undefined;

  await user.save();
};

// ================= LOGIN =================
export const loginUser = async (data: LoginInput) => {
  const { email, password } = data;

  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid credentials");

  if (!user.isVerified) {
    throw new Error("Please verify your email first");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = createToken(user._id.toString());

  return {
    token,
    user: {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
    },
  };
};

// ================= RESEND VERIFICATION =================
export const resendVerification = async (email: string): Promise<void> => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");
  if (user.isVerified) throw new Error("Email already verified");

  const token = crypto.randomBytes(32).toString("hex");

  user.emailVerificationToken = token;
  user.emailVerificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);
  await user.save();

  const emailContent = `
    <div style="text-align: center; margin-bottom: 30px;">
      <div style="display: inline-block; padding: 12px 24px; background-color: #eff6ff; border-radius: 8px; border: 1px solid #bfdbfe;">
        <span style="color: #2563eb; font-size: 16px; font-weight: 600;">📧 New Verification Token</span>
      </div>
    </div>
    
    <h2 style="margin: 0 0 16px 0; color: #1e293b; font-size: 24px; font-weight: 600;">Email Verification</h2>
    
    <p style="margin: 0 0 24px 0; color: #475569; font-size: 16px; line-height: 1.6;">
      You requested a new verification token for your GharBari account. Use the token below to verify your email address:
    </p>
    
    <div style="background-color: #f8fafc; border-left: 4px solid #667eea; padding: 20px; border-radius: 8px; margin: 24px 0;">
      <p style="margin: 0 0 8px 0; color: #64748b; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Your Verification Token</p>
      <p style="margin: 0; color: #1e293b; font-size: 18px; font-family: 'Courier New', monospace; font-weight: 600; word-break: break-all;">
        ${token}
      </p>
    </div>
    
    <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 16px; border-radius: 8px; margin: 24px 0;">
      <p style="margin: 0; color: #92400e; font-size: 14px; line-height: 1.5;">
        ⏱️ This token will expire in 24 hours.
      </p>
    </div>
    
    <p style="margin: 24px 0 0 0; color: #64748b; font-size: 14px; line-height: 1.6;">
      If you didn't request this verification token, please ignore this email.
    </p>
  `;

  await sendMail({
    to: email,
    subject: "GharBari - Email Verification Token",
    html: getEmailTemplate(emailContent),
  });
};

// ================= FORGOT PASSWORD =================
export const forgotPassword = async (email: string): Promise<void> => {
  const user = await User.findOne({ email });
  if (!user) return; // 🔐 prevent email enumeration

  const resetToken = crypto.randomBytes(32).toString("hex");

  user.resetPasswordToken = resetToken;
  user.resetPasswordExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
  await user.save();

  const emailContent = `
    <div style="text-align: center; margin-bottom: 30px;">
      <div style="display: inline-block; padding: 12px 24px; background-color: #fef2f2; border-radius: 8px; border: 1px solid #fecaca;">
        <span style="color: #dc2626; font-size: 16px; font-weight: 600;">🔐 Password Reset Request</span>
      </div>
    </div>
    
    <h2 style="margin: 0 0 16px 0; color: #1e293b; font-size: 24px; font-weight: 600;">Reset Your Password</h2>
    
    <p style="margin: 0 0 24px 0; color: #475569; font-size: 16px; line-height: 1.6;">
      We received a request to reset the password for your GharBari account. Use the token below to create a new password:
    </p>
    
    <div style="background-color: #f8fafc; border-left: 4px solid #dc2626; padding: 20px; border-radius: 8px; margin: 24px 0;">
      <p style="margin: 0 0 8px 0; color: #64748b; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Your Password Reset Token</p>
      <p style="margin: 0; color: #1e293b; font-size: 18px; font-family: 'Courier New', monospace; font-weight: 600; word-break: break-all;">
        ${resetToken}
      </p>
    </div>
    
    <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 16px; border-radius: 8px; margin: 24px 0;">
      <p style="margin: 0; color: #92400e; font-size: 14px; line-height: 1.5;">
        ⏱️ <strong>This token will expire in 1 hour.</strong> If you need more time, you can request a new password reset token.
      </p>
    </div>
    
    <div style="background-color: #fee; border-left: 4px solid #dc2626; padding: 16px; border-radius: 8px; margin: 24px 0;">
      <p style="margin: 0; color: #7f1d1d; font-size: 14px; line-height: 1.5;">
        🚨 <strong>Security Alert:</strong> If you didn't request this password reset, please contact our support team immediately. Your account may be at risk.
      </p>
    </div>
    
    <p style="margin: 24px 0 0 0; color: #64748b; font-size: 14px; line-height: 1.6;">
      For your security, never share this token with anyone.
    </p>
  `;

  await sendMail({
    to: email,
    subject: "GharBari - Password Reset Request",
    html: getEmailTemplate(emailContent),
  });
};

// ================= RESET PASSWORD =================
export const resetPassword = async (
  token: string,
  password: string
): Promise<void> => {
  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: new Date() },
  });

  if (!user) {
    throw new Error("Invalid or expired reset token");
  }

  user.password = await bcrypt.hash(password, 10);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;

  await user.save();
};

export const changePassword = async (
  userId: string,
  currentPassword: string,
  newPassword: string
): Promise<void> => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }

  const isMatch = await bcrypt.compare(currentPassword, user.password);
  if (!isMatch) {
    throw new Error("Current password is incorrect");
  }

  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();
};