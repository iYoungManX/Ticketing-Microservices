import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";
// easier to write async and await
const scryptAsync = promisify(scrypt);
export class Password {
  static async toHash(password: string) {
    const salt = randomBytes(8).toString("hex");
    // Use as Buffer because nodejs need to change to binary file when do I/O processing
    const buf = (await scryptAsync(password, salt, 64)) as Buffer;
    // return "hash.salt" format
    return `${buf.toString("hex")}.${salt}`;
  }
  // compare the input password with stored
  static async compare(storedPassword: string, suppliedPassword: string) {
    const [hashedPassword, salt] = storedPassword.split(".");
    const buf = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;
    return buf.toString("hex") === hashedPassword;
  }
}
