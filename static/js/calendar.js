// calendar 

function opacite(el,opacity)
{
    setStyle(el,"filter:","alpha(opacity="+opacity+")");
    setStyle(el,"-moz-opacity",opacity/100);
    setStyle(el,"-khtml-opacity",opacity/100);
    setStyle(el,"opacity",opacity/100);
}
function calendrier()
{
    var date = new Date();
    var jour = date.getDate();
    var moi = date.getMonth();
    var annee = date.getYear();
    var jour_calendrier=0;
    if(annee<=200)
    {
        annee += 1900;
    }
    mois = new Array('Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Decembre');
    jours_dans_moi = new Array(31,28,31,30,31,30,31,31,30,31,30,31);
    if(annee%4 == 0 && annee!=1900)
    {
        jours_dans_moi[1]=29;
    }
    var total = jours_dans_moi[moi];
    var date_aujourdui = jour+' '+mois[moi]+' '+annee;
    var citations = ["The Pessimist Sees Difficulty In Every Opportunity. The Optimist Sees The Opportunity In Every Difficulty .- Winston Churchill", "You learn more from failure than from success. Don't let it stop you. Failure builds character", "“If you have a dream, don’t just sit there. Gather courage to believe that you can succeed and leave no stone unturned to make it a reality.” Dr Roopleen","The world makes way for the man who knows where he is going. - Ralph Emerson","Winning starts with beginning.” Anonymous","What you do makes a difference, and you have to decide what kind of difference you want to make.” - Jane Goodall","Once we accept our limits, we go beyond them. - Albert Einstein ","If you can dream it, you can do it. - Walt Disney","Life isn't about finding yourself. Life is about creating yourself. - Bernard Shaw","“It's not who you think you are that holds you back it's who you think you're not.”","Every dream begins with a dreamer. Always remember, you have within you the strength, the patience, and the passion to reach for the stars to change the world.","“The first follower is an underestimated form of leadership. The first follower is what transforms a lone nut into a leader.” ― Derek Sivers"]; 
    
    document.write('<table class="cal_calendrier" onload="opacite(document.getElementById(\'cal_body\'),20);"><tbody id="cal_body"><tr><th colspan="7">'+mois[moi]+'</th></tr>');
   
    document.write('<tr>');
    for(i=0;i<=4;i++)
    {   
        jour_calendrier=jour-7+i;
        document.write('<td>'+jour_calendrier+'</td>');
        
    }
  
    document.write('</tr>');
    document.write('<tr>');
     for(i=0;i<=4;i++)
    {
        jour_calendrier=jour-2+i;
        document.write('<td>'+jour_calendrier+'</td>');
        
    }
  
    document.write('</tr>');
    document.write('<tr>');
    for(i=0;i<=4;i++)
    {
        jour_calendrier=jour+3+i;
        document.write('<td>'+jour_calendrier+'</td>');
        
    }
 
    document.write('</tr>');
    document.write('<tr>');
    for(i=0;i<=4;i++)
    {    
 
        jour_calendrier=jour+8+i;
        if (jour_calendrier>jours_dans_moi[moi]){
            jour_calendrier=0;


        }
         document.write('<td>'+jour_calendrier+'</td>');
        
    }
 

   

    /*
        $("body").on("click","td", function(){
            $(".cal_calendrier").append('<div id="notes"><p>Notes</p><textarea  name="Notes" id="Notes" rows="10" cols="20" placeholder="veuillez entrer vos notes"></textarea><menu id="menuNotes"><button id="cancel" type="reset">Annuler</button><button type="submit">Confirmer</button></menu></div>');     
        
        });*/
        $("#notes").hide();
        $("body").on("click","td", function(){
            $("#notes").show();





        });
        $("body").on("click","#cancel", function(){
            $("#notes").hide();
                });


        $("body").on("click",".incr", function(){
            $("#notess").css({
                'border-top':'5px solid red'
            })
        });
    
    document.write('</tr>');
    document.write('<th colspan=7><marquee behavior="scroll">The Pessimist Sees Difficulty In Every Opportunity. The Optimist Sees The Opportunity In Every Difficulty .- Winston Churchill</marquee> </th>');
    document.write('</tbody></table>');
    opacite(document.getElementById('cal_body'),70);
    return true;
   
}
