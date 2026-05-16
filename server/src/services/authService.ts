import { authRepository } from "../repositories/authRepository.js"

export const authService = {
    // GET USER DATA
    async findUserById(userId: number) {
        return await authRepository.findUserById(userId);
    },

    async findUserByEmail(email: string) {
        return await authRepository.findUserByEmail(email);
    },

    async findUserByEmailNoPassword(email: string) {
        return await authRepository.findUserByEmailNoPassword(email);
    },

    async findUserPassword(userId: number) {
        return await authRepository.findUserPassword(userId);
    },

    async findUserPremium(userId: number) {
        return await authRepository.findUserPremium(userId);
    },

    // UPDATE USER DATA
    async updateUserPassword(newPassword: string, userId: number) {
        return await authRepository.updateUserPassword(newPassword, userId);
    },

    async updateUsername(newUsername: string, userId: number) {
        return await authRepository.updateUsername(newUsername, userId);        
    },

    // REGISTER USER DATA
    async registerUser(username: string, email: string, hashedPassword: string) {
        return await authRepository.createUser(username, email, hashedPassword);
    },

    async registerGoogleUser(name: string, email: string, googleId: string) {
        return await authRepository.createGoogleUser(name, email, googleId);
    },

    // PASSWORD RESET
    async logPasswordResetRequest(userId: number, token: string, expireDate: string) {
        await authRepository.createPasswordResetRequest(userId, token, expireDate);
    },

    async getPasswordResetRequest(token: string) {
        return await authRepository.findPasswordResetRequest(token);
    },

    async resetUserPassword(userId: number, requestId: number, password: string) {
        return await authRepository.updateUserPasswordTransaction(userId, requestId, password);
    },
}