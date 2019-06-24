$(document).ready(function(){
    // Add smooth scrolling to all links in navbar + footer link
    $(".navbar a, footer a[href='#myPage']").on('click', function(event) {
      if (this.hash !== "") {
        event.preventDefault();
        var hash = this.hash;
        $('html, body').animate({
          scrollTop: $(hash).offset().top
        }, 900, function(){
          window.location.hash = hash;
        });
      }
    });
    $(window).scroll(function() {
      $(".slideanim").each(function(){
        var pos = $(this).offset().top;
  
        var winTop = $(window).scrollTop();
          if (pos < winTop + 600) {
            $(this).addClass("slide");
          }
      });
    });
  });
  function myFunction(){
	  const proxyurl = "https://cors-anywhere.herokuapp.com/";
    var selectedValue = document.getElementById("ddlViewBy").value;
    const url = "https://Dmsinformation.services.moxi-dev.com/dealer/"+selectedValue+"/moxi_stats"; 
    fetch(proxyurl + url) // https://cors-anywhere.herokuapp.com/https://example.com
    .then(function(response) {
    return response.json();
    })
    .then(function(myJson) {
    console.log(JSON.stringify(myJson));

    var Api_params = JSON.parse(JSON.stringify(myJson));
  	document.getElementById('msgsent').innerHTML = Api_params.messages_sent;
  	document.getElementById('approvedtasks').innerHTML = Api_params.tasks_approved;
  	document.getElementById('mros').innerHTML = Api_params.mros_created;
	
	
	  //Code for the chart
	  var msgsent_val = approvedtasks_val= mros_val = null;
  	msgsent_val = Api_params.messages_sent;
  	approvedtasks_val = Api_params.tasks_approved;
  	mros_val = Api_params.mros_created;
	  var chart = new CanvasJS.Chart("chartContainer", {
	  animationEnabled: true,
	  theme: "light2", // "light1", "light2", "dark1", "dark2"
	  title:{
		text: "Graphical Display"
	  },
	  axisY: {
		title: "Count"
	  },
	  data: [{        
		type: "column",  
		showInLegend: true, 
		legendMarkerColor: "grey",
		dataPoints: [      
			{ y: msgsent_val, label: "Messages Sent" },
			{ y: approvedtasks_val,  label: "Approved Tasks" },
			{ y: mros_val,  label: "Mros Created" }
		]
	  }]
    });
    chart.render();
	  })
    .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
  }