﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Net;
using System.IO;

public partial class _Proxy : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

      string proxyURL = "http://test.localfeedbackloop.com/api?apiKey=61067f81f8cf7e4a1f673cd230216112&noOfReviews="+Request["noOfReviews"]+"&internal=1&yelp=1&google=1&offset="+Request["offset"]+"&threshold=1";
      
      if (proxyURL != string.Empty) {
         HttpWebRequest request = (HttpWebRequest)WebRequest.Create(proxyURL);
         request.Method = "GET";
         HttpWebResponse response = (HttpWebResponse)request.GetResponse();

         if (response.StatusCode.ToString().ToLower() == "ok") {
            string contentType = response.ContentType;
            Stream content = response.GetResponseStream();
            StreamReader contentReader = new StreamReader(content);
            Response.ContentType = contentType;
            Response.Write(contentReader.ReadToEnd());
         }
      }
    }
}