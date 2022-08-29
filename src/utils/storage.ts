import CryptoJS from 'crypto-js'

// 十六位十六进制数作为密钥
const SECRET_KEY = CryptoJS.enc.Utf8.parse('3333e6e143439161')
// 十六位十六进制数作为密钥偏移量
const SECRET_IV = CryptoJS.enc.Utf8.parse('e3bbe7e3ba84431a')

export interface RepositoryConfig {
    type: 'sessionStorage' | 'localStorage'
    prefix: string
    expire: number
    isEncrypt: boolean
}

export interface RepositoryValue<T> {
    value: T
    time: number
    expire: number
}

class Repository {
    private config: RepositoryConfig = {
        type: 'localStorage',
        prefix: 'DAP_',
        expire: 30 * 24 * 60 * 60, // s
        isEncrypt: true,
    }

    private storage: Storage = window.localStorage

    constructor(options?: Partial<RepositoryConfig>) {
        this.config = { ...this.config, ...options }
        if (this.config.type === 'sessionStorage') {
            this.storage = window.sessionStorage
        }
    }

    public set(key: string, value: any, expire = 0) {
        if (value === '' || value === null || value === undefined) {
            value = null
        }

        if (isNaN(expire) || expire < 0) throw new Error('Expire must be a number')

        expire = (expire ? expire : this.config.expire) * 1000
        let data: RepositoryValue<any> = {
            value,
            time: Date.now(),
            expire,
        }

        const encryptString = this.config.isEncrypt ? this.encrypt(JSON.stringify(data)) : JSON.stringify(data)

        this.storage.setItem(this.formatKey(key), encryptString)
    }

    public get<T>(key: string): T | null {
        key = this.formatKey(key)

        if (!this.storage.getItem(key)) {
            return null
        }

        const data: RepositoryValue<T> = this.config.isEncrypt
            ? JSON.parse(this.decrypt(this.storage.getItem(key)!))
            : JSON.parse(this.storage.getItem(key)!)

        const nowTime = Date.now()

        if (data.expire < nowTime - data.time) {
            this.remove(key)
            return null
        }
        return data.value
    }

    public remove(key: string) {
        this.storage.removeItem(this.formatKey(key))
    }

    private encrypt(data: string) {
        const dataHex = CryptoJS.enc.Utf8.parse(data)
        const encrypted = CryptoJS.AES.encrypt(dataHex, SECRET_KEY, {
            iv: SECRET_IV,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
        })
        return encrypted.ciphertext.toString()
    }

    private formatKey(key: string) {
        return this.config.prefix + key
    }

    private decrypt(data: string) {
        const encryptedHexStr = CryptoJS.enc.Hex.parse(data)
        const str = CryptoJS.enc.Base64.stringify(encryptedHexStr)
        const decrypt = CryptoJS.AES.decrypt(str, SECRET_KEY, {
            iv: SECRET_IV,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
        })
        const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)
        return decryptedStr.toString()
    }
}

const repository = new Repository()

export default repository


