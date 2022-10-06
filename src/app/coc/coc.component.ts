import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { environment as env } from "../../environments/environment";
interface Clan {
  [x: string]: any;

  name: string;
  clanLevel: string;
  members: number;
  badgePic: string;
  memberList: Member[];
}
interface Member {
  leaguePic: string;
  expLevel: number;
  role: string;
}
@Component({
  selector: "app-coc",
  templateUrl: "./coc.component.html",
  styleUrls: ["./coc.component.css"],
})
export class CocComponent implements OnInit {
  myClan: Clan;
  clanName: any;
  members: any;
  rank: any;
  separator = " |  ";
  constructor(private http: HttpClient) {
    this.getClanInfo();
  }

  ngOnInit(): void {}

  getClanInfo(): void {
    console.log('entered!!')
    let options = {
      headers: new HttpHeaders().set("Access-Control-Allow-Origin", "*"),
    };

    let res;
    this.http.get(`${env.dev.serverUrl}/coc/getClanInfo`, options).subscribe((result: Clan) => {
        this.myClan = result.body;
        // console.log('result');
        // console.log(result);

        res = result.body;
      });
      
    console.log("entered");
    setTimeout(() => {
      console.log(res);
    }, 2000);
  }
}
