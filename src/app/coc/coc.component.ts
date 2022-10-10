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
  donationsReceived: number;
  donations: number;
  trophies: number;
  defenseWins: any;
  attackWins: number;
  tag: any;
  name(name: any): unknown;
  leaguePic: string;
  expLevel: number;
  role: string;
  totalPoints:number;
}
interface Player {
  [x: string]: any;
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
  tempMembers = new Map<string, {member: Member, totalPoints:number}>();
  sortedMembers?;
  players =  Array<{member: Member, totalPts: number}>();

  constructor(private http: HttpClient) {
    this.getClanInfo();
    // this.memberInfo = 'ss';
  }

  ngOnInit(): void {
    this.sort();
  }

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
      

        this.memberInfo = result;
        res = result.body;
        this.sort();
      });

    console.log("entered");
    setTimeout(() => {
      // console.log(res);
    }, 2000);
  }

  sort(){
    let i = 0;
    let totalPoints = 0.0;
    let trophyPts =0;
    let donationsPts= 0;
    let donationsReceivedPts= 0;
    for (let member of this.myClan.memberList ){     
      trophyPts =  member.trophies/1000;
      donationsPts =  member.donations/100;
      donationsReceivedPts =  member.donationsReceived/100;

      totalPoints = trophyPts+donationsPts-donationsReceivedPts;
      totalPoints = Math.round(totalPoints * 10) / 10; //rount to 1 decimal place
      this.tempMembers.set(member.tag, {member: member, totalPoints: totalPoints})
      i++;
    }
    this.sortedMembers = new Map([...this.tempMembers.entries()].sort((a, b) => b[1].totalPoints - a[1].totalPoints));
    // console.log(this.sortedMembers);
 
    for(let m of this.sortedMembers){
      this.players.push(m)
    }
    // console.log(this.players);
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

        memberRes = result.body;
        let i = 0;
        for (let member of this.myClan.memberList) {
          if (member.tag === memberTag) {
            this.memberInfo = memberRes
          }
          i++;
        }
      });


  
  }
}
