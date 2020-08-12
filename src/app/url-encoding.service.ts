import { Injectable } from '@angular/core';
import { HttpUrlEncodingCodec } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UrlEncodingService {
  private codec = new HttpUrlEncodingCodec();

  constructor() {}

  ngEncode(param: string): string {
    return this.codec.encodeValue(param);
  }

  ngDecode(param: string): string {
    return this.codec.decodeValue(param);
  }
}
