import {Injectable} from '@angular/core';
import {AES, enc} from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {
  private encryptionKey = 'wsdD343D57rwWgvs3346';

  encrypt(rawData: string): string {
    return AES.encrypt(rawData, this.encryptionKey).toString();
  }

  decrypt(encryptedData: string): string {
    const decryptedBytes = AES.decrypt(encryptedData, this.encryptionKey);
    return decryptedBytes.toString(enc.Utf8);
  }
}
