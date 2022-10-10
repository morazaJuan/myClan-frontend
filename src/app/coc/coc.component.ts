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
  defenseWins: any;
  attackWins: number;
  tag: any;
  name(name: any): unknown;
  leaguePic: string;
  expLevel: number;
  role: string;
}
interface Player {
  [x: string]: any;
tag: string;
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
  memberInfo :Player;
  separator = " |  ";
  constructor(private http: HttpClient) {
    this.getClanInfo();
    // this.memberInfo = 'ss';
  }

  ngOnInit(): void {}

  getClanInfo(): void {
    console.log("entered!!");
    let options = {
      headers: new HttpHeaders().set("Access-Control-Allow-Origin", "*"),
    };

    let res;
    this.http
      .get(`${env.dev.serverUrl}/coc/getClanInfo`, options)
      .subscribe((result: Player) => {
        this.myClan = result.body;
        console.log(this.myClan.memberList[0]);
        this.memberInfo = result;
        res = result.body;
      });

    console.log("entered");
    setTimeout(() => {
      // console.log(res);
    }, 2000);
  }

  getMoreMemberStats(memberTag): void {
    // let member;
    let options = {
      headers: new HttpHeaders().set("Access-Control-Allow-Origin", "*"),
      params: new HttpParams().set("memberTag", memberTag),
    };
    let memberRes;
    this.http
      .get(`${env.dev.serverUrl}/coc/getMemberInfo`, options)
      .subscribe((result: any) => {
         // console.log(result);
        // console.log(result);
     
        memberRes = result.body;
        let i = 0;
        for (let member of this.myClan.memberList) {
          if (member.tag === memberTag) {
            // console.log(memberRes.name);
            // console.log(memberRes.attackWins);
            // console.log(memberRes.defenseWins);
            this.memberInfo = memberRes
            // this.myClan.memberList[i].attackWins = memberRes.attackWins ;
            // this.myClan.memberList[i].defenseWins = memberRes.defenseWins ;
          }
          i++;
        }
      });

    // console.log("entered");
    // setTimeout(() => {
    //   // console.log(member);
    //   let i = 0;
    //   for (let member of this.myClan.memberList) {
    //     if (member.tag === memberTag) {
    //       console.log(memberRes.name);
    //       console.log(memberRes.attackWins);
    //       console.log(memberRes.defenseWins);
    //       this.myClan.memberList[i].attackWins = memberRes.attackWins ;
    //       this.myClan.memberList[i].defenseWins = memberRes.defenseWins ;
    //     }
    //     i++;
    //   }
    // }, 2000);
  
  }
}
