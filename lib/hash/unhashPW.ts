import bcrypt from "bcrypt"

export const validatePW = async (password: string, hash: string) => {
	const isValid = await bcrypt.compare(password, hash)
	return isValid
}
