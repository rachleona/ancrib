export default function caesar(input, options) 
{
    if(typeof input != "string" || options.key != "number" || !Number.isInteger(options.key)) 
    throw "invalid input"
    
    this.key = options.key || 1
    this.input = input.split("")
    
    const cipher = (k, chars) => {
        return chars.map( c => {
            const char = c.charCodeAt(0)
            if(char > 64 && char < 91)
            {
                return String.fromCharCode(65 + (char + k) % 65 % 26)
            }
            else if(char > 96 && char < 123)
            {
                return String.fromCharCode(97 + (char + k) % 97 % 26)
            }
            else
            {
                return String.fromCharCode(char)
            }
        }).join("")
    }

    this.encrypt = () => {
        return cipher(this.key, input)
    }

    this.decrypt = () => {
        return cipher(26 - this.key, input)
    }

    
}