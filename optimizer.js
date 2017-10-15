var express = require("express");
var app= express();
var serv = require("http").Server(app);

app.get("/", function (req, res) {
	res.sendFile(__dirname+ "/index.html");
});
app.use("/client", express.static(__dirname + "/client"));

serv.listen(3000);
console.log("Server Started");

var SOCKET_LIST=[];


var optimizedSchedule = [];


function optimize(courses){
	optimizedMaxProfit(sort(courses) , courses.length);

    for (var i = 0; i < courses.length; i++){
        console.log("Start: " + optimizedSchedule[i].startTime
                    + "Finish: " + optimizedSchedule[i].finishTime
                    + "Weight: " + optimizedSchedule[i].weight)
    }
}


//sorts the jobs by their finishing time
function sort(courses){  // has start time, finish time, and weight
    if (courses.length < 2){
        return courses;
    }
 
    var middle = parseInt(courses.length / 2);
    var left   = courses.slice(0, middle);
    var right  = courses.slice(middle, courses.length);
 
    return merge(optimize(left), optimize(right));
}

function merge(left, right)
{
    var result = [];
 
    while (left.length && right.length) {
        if (left[0] <= right[0]) {
            result.push(left.shift());
        } else {
            result.push(right.shift());
        }
    }
 
    while (left.length){
        result.push(left.shift());
    }
 
    while (right.length){
        result.push(right.shift());
    }
 
    return result;
}


//recursive algorithm that finds the maximum profit we can get from an array of jobs sorted by their finish time
function maxProfit(courses, n){
	if (n == 1) {
		optimizedSchedule.push(courses[n-1].weight);
		return courses[n-1].weight;
	}

	var inclProf = courses[n-1].weight;
	var i = latestNonConflict(courses, n);

	if( i != -1){
		inclProf += maxProfit(courses, i + 1);
	}
	var exclProf = maxProfit(courses, n-1)

	optimizedSchedule.push(Math.max(inclProf, exclProf));
	return Math.max(inclProf, exclProf);
}


//finds the index of the nearest job BEFORE the job at index i
function latestNonConflict(jobs, i){
    for (var j = i -1; j >=0; j++){
		if (jobs[j].finishTime <= jobs[i].finishTime){
			return j;
		}
	}
	return -1;
}


var io=require("socket.io")(serv,{});
io.sockets.on("connection", function(socket){           //initialize when the player connects
	socket.id=Math.random();
	SOCKET_LIST[socket.id]=socket;

	socket.on("disconnect", function(){           //Delete when the player disconnects
		delete SOCKET_LIST[socket.id];
	});
});





// // C++ program for weighted job scheduling using Naive Recursive Method
// #include <iostream>
// #include <algorithm>
// using namespace std;
 
// // A job has start time, finish time and profit.
// struct Job
// {
//     int start, finish, profit;
// };
 
// // A utility function that is used for sorting events
// // according to finish time
// bool jobComparataor(Job s1, Job s2)
// {
//     return (s1.finish < s2.finish);
// }
 
// // Find the latest job (in sorted array) that doesn't
// // conflict with the job[i]. If there is no compatible job,
// // then it returns -1.
// int latestNonConflict(Job arr[], int i)
// {
//     for (int j=i-1; j>=0; j--)
//     {
//         if (arr[j].finish <= arr[i-1].start)
//             return j;
//     }
//     return -1;
// }
 
// // A recursive function that returns the maximum possible
// // profit from given array of jobs.  The array of jobs must
// // be sorted according to finish time.
// int findMaxProfitRec(Job arr[], int n)
// {
//     // Base case
//     if (n == 1) return arr[n-1].profit;
 
//     // Find profit when current job is inclueded
//     int inclProf = arr[n-1].profit;
//     int i = latestNonConflict(arr, n);
//     if (i != -1)
//       inclProf += findMaxProfitRec(arr, i+1);
 
//     // Find profit when current job is excluded
//     int exclProf = findMaxProfitRec(arr, n-1);
 
//     return max(inclProf,  exclProf);
// }
 
// // The main function that returns the maximum possible
// // profit from given array of jobs
// int findMaxProfit(Job arr[], int n)
// {
//     // Sort jobs according to finish time
//     sort(arr, arr+n, jobComparataor);
 
//     return findMaxProfitRec(arr, n);
// }
 
// // Driver program
// int main()
// {
//     Job arr[] = {{3, 10, 20}, {1, 2, 50}, {6, 19, 100}, {2, 100, 200}};
//     int n = sizeof(arr)/sizeof(arr[0]);
//     cout << "The optimal profit is " << findMaxProfit(arr, n);
//     return 0;
// }