// Copyright (c) 2015 Kevin Revie. All Rights Reserved.

var limit=20;
var isActive=false;
$(function()
{
   getJSON();
   $(document).on("scroll", function()
   {
      if ($(window).scrollTop()+$(window).height()>$(document).height()-100)
      {
         if (!isActive)
         {
            isActive=true;
            getJSON();
         }
      }
   })
});

//This function gets the json data
function getJSON()
{
   var originalurl="http://test.localfeedbackloop.com/api?apiKey=61067f81f8cf7e4a1f673cd230216112&noOfReviews="+limit+"&internal=1&yelp=1&google=1&offset="+$("#reviewList li").length+"&threshold=1";
   var url="proxy.aspx?noOfReviews="+limit+"&offset="+$("#reviewList li").length;
   jQuery.ajax({
      type: "GET",
      url: url,
      success: function(data)
      {
         displayTitle(data.business_info);
         isActive=!(data.reviews&&data.reviews.length>0);
         displayResult(data.reviews);
      }
   });
}


function displayTitle(data)
{
   if (data&&data.business_name)
      $("#business_name").html(data.business_name+' Reviews');
}


function displayResult(data)
{
   var listHtml="";
   for (var x in data)
   {
      listHtml+='<li><a href="#"><span class="stars"><span class="star'+data[x].rating+'"></span></span>&nbsp;&nbsp;'+data[x].customer_name+'<i>'+formatDate(data[x].date_of_submission)+'</i><div class="description">'+data[x].description+'</div></a></li>'
   }
   $("#reviewList").append(listHtml).listview("refresh");
}


//set an array of month names to use in formatting
var monthNames=[
   "January", "February", "March",
   "April", "May", "June", "July",
   "August", "September", "October",
   "November", "December"
];


function formatDate(dateString)
{
   //convert the string for Firefox
   dateString=dateString.replace(/-/g, '/');
   var dateObj=new Date(dateString);
   var ampm="am";
   var hours=dateObj.getHours();
   var mins=dateObj.getMinutes();
   if (hours>12)
   {
      hours=hours-12;
      ampm="pm";
   }
   if (mins<10)
   {
      mins="0"+mins;
   }
   //return the fully formatted date
   return monthNames[dateObj.getMonth()]+" "+dateObj.getDate()+", "+dateObj.getFullYear()+" - "+hours+":"+mins+ampm;
}