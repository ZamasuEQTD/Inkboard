export interface DecodedToken {
  sub:   string;
  name:  string;
  role: string[];
  exp:   number;
  iss:   string;
  aud:   string;
}
