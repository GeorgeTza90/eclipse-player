import { authRepository } from "../repositories/authRepository.js"

export const authService = {
    // GET USER DATA
    async getUserbyID(userId: number) {
        return await authRepository.getUserbyID(userId);
    },

    async getUserbyEmail(email: string) {
        return await authRepository.getUserbyEmail(email);
    },

    async getUserbyEmailNoPassword(email: string) {
        return await authRepository.getUserbyEmailNoPassword(email);
    },

    async getUserPassword(userId: number) {
        return await authRepository.getUserPassword(userId);
    },

    async getUserPremium(userId: number) {
        return await authRepository.getUserPremium(userId);
    },

    // UPDATE USER DATA
    async updateUserPassword(newPassword: string, userId: number) {
        return await authRepository.updateUserPassword(newPassword, userId);
    },

    async updateUserName(newUsername: string, userId: number) {
        return await authRepository.updateUserName(newUsername, userId);        
    },

    // REGISTER USER DATA
    async registerUser(username: string, email: string, hashedPassword: string) {
        return await authRepository.registerUser(username, email, hashedPassword);
    },

    async registerGoogleUser(name: string, email: string, googleId: string) {
        return await authRepository.registerGoogleUser(name, email, googleId);
    },

    // PASSWORD RESET
    async logPasswordResetRequest(userId: number, token: string, expireDate: string) {
        await authRepository.logPasswordResetRequest(userId, token, expireDate);
    },

    async getPasswordResetRequest(token: string) {
        return await authRepository.getPasswordResetRequest(token);
    },

    async resetUserPassword(userId: number, requestId: number, password: string) {
        return await authRepository.resetUserPasswordTransaction(userId, requestId, password);
    },
}