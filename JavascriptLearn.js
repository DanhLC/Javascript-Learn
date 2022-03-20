// Create a greeting function
function greeting(){
    // Show alert input text
    var name = prompt("What's your name?");
    var result = 'Hello ' + name;
    console.log(result);
}

// Create a number calculate function
function sumNumber(num1, num2){
    var result =  num1 + num2;
    console.log(result);
}

// Create a while loop function
function whileLoop(num1){
    while(num1 < 100)
    {
        num1++;
        console.log(num1);
    }
}

// Create data type
function dataTypeLearn(){
    let yourAge = 18;
    let yourName = 'Ryuji';
    let fullName = {first: 'Takasu', last: 'Ryuji'};
    let hobbies = ['playing games', 'programming', 'playing music', 'drink coffee'];

    // Get length
    // console.log(hobbies.length);

    // Get index of string array
    // console.log(hobbies.indexOf('programming'));

    // Get a slice of array from index to index
    // console.log(hobbies.slice(1,4));

    // console.log(yourName.replace("Ryuji", "This is the replace text"));
    // console.log(yourName.toUpperCase());
    // console.log(yourName.toLowerCase());
    // console.log(yourName.charAt(2));
    // console.log(hobbies[2]);
    // console.log(yourName.split(','));
    
    // hobbies[2] = 'replace hobbies';
    // console.log(hobbies[2]);

    // for (var i = 0; i < hobbies.length; i++)
    // {
    //     console.log(hobbies[i]);
    // }

    // console.log(hobbies.toString());
    // console.log(hobbies.join(' join this string in,'));

    // Remove the last string in array
    // console.log(hobbies, hobbies.pop(), hobbies);

    // Push string to array
    // console.log(hobbies.push("new String push in"), hobbies);

    // Remove the first string in array
    // console.log(hobbies.shift(), hobbies);

    // Insert new string to first array
    // console.log(hobbies.unshift("new Legth Array"), hobbies);    

    // Concat/ combine array together
    let workToDo = ["House Work", "Going Work", "Learning More Languages"];
    let newWork = hobbies.concat(workToDo);

    // Sorting array from last to first
    // console.log(newWork.reverse());
    // console.log(newWork.sort());

    // Call Properties
    // console.log(fullName.first);
    // console.log(fullName.last);
}

function pushNumberToArray(){
    let emptyArray = new Array();
    for (var num = 0; num < 10; num++){
        emptyArray.push(num);
    }

    console.log(emptyArray);
}

function createProperties(){
    let studentLearn =
    [
        {
        name: "Ryuji",
        age: "25",
        learn: "javascript",
        function: "learn to create properties",
        studentInfo: function() {
            return this.name + "\n" + this.age + "\n" + this.learn + "\n" + this.function;
        }
        }
    ];

    let fornatString = `My name is ${studentLearn[0].name}, I'm ${studentLearn[0].age}, Im learn ${studentLearn[0].learn}, ${studentLearn[0].function}`;

    console.log(fornatString);
    console.log(studentLearn[0].studentInfo());
}

function getMonth(){
    try{
        var monthInput = prompt("What's month do you want to know?");
        
        switch(parseInt(monthInput)){
            case 1:
                month = "January";
                break;
            case 2:
                month = "February"
                break;
            case 3:
                month = "March"
                break;                
            case 4:
                month = "April"
                break;
            case 5:
                month = "May"
                break;
            case 6:
                month = "June"
                break;
            case 7:
                month = "July"
                break;
            case 8:
                month = "August"
                break;
            case 9:
                month = "September"
                break;                           
            case 10:
                month = "October"
                break;
            case 11:
                month = "November"
                break;
            case 12:
                month = "December"
                break;
            
            default:
                break;                    
        }

        console.log(month);
    }
    catch (error){
        console.log("error catch: ", error);
    }
}
// greeting();
// sumNumber(10,20);
// whileLoop(10);
// dataTypeLearn();
// pushNumberToArray();
// createProperties();
// getMonth();

