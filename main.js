// Project: VFW Project 2
// Name: Brent Marohnic
// Term: 1207
// Date: 2012-07-12

window.addEventListener("DOMContentLoaded", function(){
	
	function getIt(x){
		var whichElement = document.getElementById(x);
		return whichElement;
	}
	
	function getItByName(x){
		var whichElement = document.getElementsByName(x);
		for (var i=0, j=whichElement.length; i<j; i++){
			if (whichElement[i].checked) {
				return whichElement[i].value;
			}
		}
		
	}
	
	function getItCB(x){
		var whichElement = document.getElementById(x);
		if (whichElement.checked){
			return "Yes";
		} else {
			return "No";
		}
	}
	
	var makesArray = ["Select Manufacturer", "Acura", 
					  "Audi", "BMW","Chevy", "Chrysler", "Dodge", 
					  "Ford", "Honda", "Hyundai", "Infinity", 
					  "Jeep", "Kia", "Lexus", "Lincoln", "Mercedes", 
					  "Nissan", "Toyota"];
					  
	//populate values for the select element
	
	function createMakesSelect (){
	//	var formTag = document.getElementsByTagName("form"),
		var	selectLi = getIt('carMake'),
			makesSelect = document.createElement('select');
			//go ahead and give it an id in case I need to target it later
			makesSelect.setAttribute("id","allMakes");
			//create the optgroup portion of the select element here
			var makesLabel = document.createElement('optgroup');
			//go ahead and give it an id in case I need to target it later
			makesLabel.setAttribute("id","makesOptGroup");
			//set the value of the label to the first value in the array
			makesLabel.setAttribute("label", makesArray[0]);
			//make sure to set i to 1 so that the label is not inserted twice
			for (var i = 1, j = makesArray.length; i < j; i++) {
				
				var makeMakes = document.createElement('option');
					
				makeMakes.setAttribute("value", makesArray[i]);
				makeMakes.innerHTML = makesArray[i];
				makesLabel.appendChild(makeMakes);
				
			}
			makesSelect.appendChild(makesLabel);
			selectLi.appendChild(makesSelect);
	}
	
	function changeDisplay(x) {
		switch(x) {
			case 1:
				getIt('bigForm').style.display = "none";
				getIt('clearAll').style.display = "inline";
				getIt('displayData').style.display = "none";
				getIt('addNew').style.display = "inline";
				break;
			
			case 0:
				getIt('bigForm').style.display = "block";
				getIt('clearAll').style.display = "inline";
				getIt('displayData').style.display = "inline";
				getIt('addNew').style.display = "none";
				getIt('items').style.display = "none";
				break;
				
			default:
				return false;
		}	
	}
	
	createMakesSelect();
	
	function storeData(){
		
		var id = localStorage.length;
		var carStuff = {};
			carStuff.owner = ["Owner:", getIt('owner').value];
			carStuff.make = ["Make:", getIt('allMakes').value];
			carStuff.model = ["Model:", getIt('carModel').value];
			carStuff.mileage = ["Mileage:", getIt('carMileage').value];
			carStuff.transmission = ["Transmission:", getItByName('transmission')];
			carStuff.condition = ["Condition:", getIt('carCondition').value];
			carStuff.email = ["Owner's Email:", getIt('email').value];
			carStuff.url = ["Favorite Website:", getIt('url').value];
			carStuff.oilCB = ["Oil and Filter:", getItCB('oilAndFilter')];
			carStuff.tireRotationCB = ["Tire Rotation:", getItCB('tireRotation')];
			carStuff.airFilterCB = ["Air Filter:", getItCB('airFilter')];
			carStuff.cabinFilterCB = ["Cabin Filter:", getItCB('cabinFilter')];
			carStuff.sparkPlugsCB = ["Spark Plugs:", getItCB('sparkPlugs')];
			carStuff.sBeltCB = ["Serpentine Belt:", getItCB('sBelt')];
			carStuff.tBeltCB = ["Timing Belt:", getItCB('tBelt')];
			carStuff.handy = ["Do-it-yourselfer?:", getItByName('handy')];
		
		localStorage.setItem(id, JSON.stringify(carStuff));
		alert("Vehicle Saved!");
		
	}
	
	function displayData(){
		if (localStorage.length === 0) {
			alert("There is no data to display!");
			
		}
		changeDisplay(1);
		var makeDiv = document.createElement('div');
		makeDiv.setAttribute("id","items");
		var makeList = document.createElement('ul');
		makeDiv.appendChild(makeList);
		document.body.appendChild(makeDiv);
		getIt('items').style.display = "block";
		
		for (var i=0, j=localStorage.length; i<j; i++) {
			var makeLi = document.createElement('li');
			makeList.appendChild(makeLi);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			
			var obj = JSON.parse(value);
			var makeSubList = document.createElement('ul');
			makeLi.appendChild(makeSubList);
			for (var n in obj) {
				var makeSubLi = document.createElement('li');
				makeSubList.appendChild(makeSubLi);
				var optSubText = obj[n][0]+" "+obj[n][1];
				makeSubLi.innerHTML = optSubText;
			}
		}
	}
	
	function clearStoredData(){
		if (localStorage.length === 0) {
			alert("Not stored data to clear!");
			changeDisplay(0);
		} else {
			localStorage.clear();
			alert("All verhicle information has been deleted!");
			window.location.reload();
			return false;
		}
	}
	
	var save = getIt('saveIt');
	save.addEventListener('click', storeData);
	
	var clearAll = getIt('clearAll');
	clearAll.addEventListener('click', clearStoredData);
	
	var displayIt = getIt('displayData');
	displayIt.addEventListener('click', displayData);
})

