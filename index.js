function tournamentScores(matchScores)
{
  let result=[];
  matchScores.forEach((e)=>decodeMatchScore(e,result));
  return sortResult(result);
}
function extractDetails(matchScore){
  var letters = /^[A-Za-z]+$/;
  let temp=matchScore.split('-');
  let team1=temp[0].split(' ');
  team1.pop();
  let team2=temp[1].split(' ');
  team2=team2.reverse();
  team2.pop();
  return [team1,team2];
}
function getPoints(team1,team2){
  if(parseInt(team1[1])>parseInt(team2[1])){
    team1Points=3;
    team2Points=0;
  }
  else if(parseInt(team1[1])<parseInt(team2[1])){
    team1Points=0;
    team2Points=3;
  }
   else if(parseInt(team1[1])===parseInt(team2[1])){
    team1Points=1;
    team2Points=1;
  }
  return [team1Points,team2Points];
}
function getGoalsScored(team1,team2){
  return [parseInt(team1[1]),parseInt(team2[1])];
}
function getGoalDifference(team1,team2){
  return [parseInt(team1[1])-parseInt(team2[1]),parseInt(team2[1])-parseInt(team1[1])];
}
function updateScore(team,teamPoints,teamGS,teamGD,result){
  let teamExistsInResultList=false;
  for(let i=0;i<result.length;i++){
    if(result[i][0]===team[0])
    {
      teamExistsInResultList=true;
      result[i][1]+=teamPoints;
      result[i][2]+=teamGS;
      result[i][3]+=teamGD;
    }
  }
  if(!teamExistsInResultList){
    result.push([team[0],teamPoints,teamGS,teamGD]);
  } 
}
function updateResult(team1,team2,result){
  [team1Points,team2Points]=getPoints(team1,team2);
  [team1GS,team2GS]=getGoalsScored(team1,team2);
  [team1GD,team2GD]=getGoalDifference(team1,team2);
  updateScore(team1,team1Points,team1GS,team1GD,result);
  updateScore(team2,team2Points,team2GS,team2GD,result);
}
function decodeMatchScore(matchScore,result){
  [team1,team2]=extractDetails(matchScore);
  updateResult(team1,team2,result);
 }
function sortResult(result){
  return result.sort(function(a, b){return b[1]-a[1]===0?b[2]-a[2]===0?b[3]-a[3]:b[2]-a[2]:b[1]-a[1]});
 }




 console.log(tournamentScores(["A 0 - 1 B", "C 2 - 0 D", "B 2 - 2 C", "D 3 - 1 A", "A 2 - 2 C", "B 2 - 0 D"]));

console.log(tournamentScores(["A 2 - 1 B", "C 3 - 0 D", "B 1 - 1 C", "D 1 - 0 A", "A 3 - 0 C", "B 2 - 4 D"]));
 console.log(tournamentScores(["A 4 - 0 B", "C 2 - 1 D", "B 1 - 0 C", "D 3 - 2 A", "A 1 - 3 C", "B 2 - 1 D"]));

// ➞ [ [ "B", 7, 5, 3 ], [ "C", 5, 6, 2 ], [ "D", 3, 3, -2 ], [ "A", 1, 3, -3 ] ]);
// Final order is B, C, D, A. All teams have different points, so that a simple descendant sort by points obtained is enough.

// 
// //  ➞ [ [ "C", 6, 5, 2 ], [ "B", 6, 3, -2 ], [ "A", 3, 7, 1 ], [ "D", 3, 5, -1 ] ]
// // Final order is C, B, A, D (C and B have same points, but C has more scored goals than B; A and D have same points but A has more scored goals than D).

// 
// ; ➞ [ "A", 6, 5, 3 ], [ "D", 6, 5, 0 ], [ "C", 4, 4, 0 ], [ "B", 1, 4, -3 ]]
// Final order is A, D, C, B (A and D have same points and same number of scored goals, but A has a greater goals difference than D).