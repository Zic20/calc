document.getElementById('add').addEventListener('click', addToList);
document.getElementById('submit').addEventListener('click', showTime);
document.getElementById('totals').addEventListener('click', getTotal);


function showTime(e) {
    e.preventDefault();
    if (document.getElementById('firstTime').value == "" || document.getElementById('secondTime').value == "") {
        return alert('Specify Start Time and End Time for activity!');
    }
    var time1 = document.getElementById('firstTime').value;
    var time2 = document.getElementById('secondTime').value;
    var result = document.getElementById('result');
    var firstHour = time1.split(':')[0];
    var firstMinute = time1.split(':')[1];
    var secondHour = time2.split(':')[0];
    var secondMinute = time2.split(':')[1];
    var startTime = new Date();
    var endTime = new Date();
    startTime.setHours(firstHour, firstMinute, 0);
    endTime.setHours(secondHour, secondMinute, 0);
    if (startTime.getHours() > endTime.getHours()) {
        result.value = "";
        return alert("Invalid time input");
    } else {
        var hoursDifference = endTime.getHours() - startTime.getHours();
        var minutesdifference = endTime.getMinutes() - startTime.getMinutes();
        if (hoursDifference > 0) {
            if (minutesdifference < 0) {
                hoursDifference *= 60;
                hoursDifference += minutesdifference;
                minutesdifference = hoursDifference % 60;
                hoursDifference -= minutesdifference;
                hoursDifference /= 60;
                if (hoursDifference < 2) {
                    if (minutesdifference < 1) {
                        result.value = hoursDifference + 'hr'
                    } else if (minutesdifference == 1) {
                        result.value = hoursDifference + 'hr ' + minutesdifference + 'min';
                    } else {
                        result.value = hoursDifference + 'hr ' + minutesdifference + 'mins';
                    }
                } else {
                    if (minutesdifference < 1) {
                        result.value = hoursDifference + 'hrs'
                    } else if (minutesdifference == 1) {
                        result.value = hoursDifference + 'hrs ' + minutesdifference + 'min';
                    } else {
                        result.value = hoursDifference + 'hr ' + minutesdifference + 'mins';
                    }
                }
            } else if (minutesdifference == 0) {
                result.value = hoursDifference + 'hrs';
            } else {
                if (minutesdifference > 1) {
                    result.value = hoursDifference + 'hrs ' + minutesdifference + 'mins';
                } else {
                    result.value = hoursDifference + 'hrs ' + minutesdifference + 'min';
                }
            }
        } else {

            if (minutesdifference == 0) {
                result.value = hoursDifference + 'hrs';
            } else if (minutesdifference > 1) {
                result.value = minutesdifference + 'mins';
            } else {
                result.value = minutesdifference + 'min';
            }
        }
    }
}

function addToList(e) {
    e.preventDefault();
    if (document.getElementById('result').value == "") {
        return alert('Please specify time input!')
    }
    var table = document.getElementById('list');
    var rowCount = table.rows.length;
    var row = table.insertRow(rowCount);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);

    cell1.innerHTML = document.getElementById('week').value;
    cell2.innerHTML = document.getElementById('date').value;
    cell3.innerHTML = document.getElementById('act').value
    cell4.innerHTML = document.getElementById('firstTime').value + ' - ' + document.getElementById('secondTime').value;
    cell5.innerHTML = document.getElementById('result').value

    document.getElementById('act').value = "";
    document.getElementById('firstTime').value = "";
    document.getElementById('secondTime').value = "";
    document.getElementById('result').value = "";

}

function getTotal(e) {
    e.preventDefault();
    var min=0, hrs = 0;
    var result;
    var list = document.getElementById('list');
   
// check whether the row for total has been added
    for (i=1;i<list.rows.length;i++){
        if (list.rows[i].cells[0].innerHTML.includes('Total Hours')) {
            removeRow(list.rows[i])
            return
        }
    }

    var rowCount = list.rows.length;
    for (i = 1; i <= rowCount - 1; i++) {
        result = document.getElementById('list').rows[i].cells[4].innerHTML;
        if (result.length <= 6) {
            if (result.includes('m')) {
                console.log(result.slice(0, result.indexOf('m')))
                if (isNaN(parseInt(result.slice(0, result.indexOf('m'))))) {
                    min += 0
                } else {
                    min += parseInt(result.slice(0, result.indexOf('m')));
                }
            } else {
                hrs += parseInt(result.slice(0, result.indexOf('h')));
            }
        } else {
            time = result.split(' ');
            hrs += parseInt(time[0].slice(0, time[0].indexOf('h')));
            min += parseInt(time[1].slice(0, time[1].indexOf('m')));
        }
    }

    var row = list.insertRow(rowCount);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    cell1.innerHTML = 'Total Hours';

    // converts minutes to hours
    if (min >= 60) {
        hrs += Math.floor(min/60);
        min %=60;
    }

    if (hrs > 0 || min > 0) {
        if (hrs == 0) {
            if (min > 1) {
            cell5.innerHTML = min + 'mins';
            } else {
                cell5.innerHTML = min + 'min';
            }
        } else if (min == 0) {
            if (hrs > 1) {
            cell5.innerHTML = hrs + 'hrs';
            } else {
                cell5.innerHTML =  hrs + 'hr';
            }
        } else {
            if (hrs > 1 & min > 1) {
                cell5.innerHTML = hrs + 'hrs ' + min + 'mins';
            } else if (hrs > 1 && min <2) {
                cell5.innerHTML = hrs + 'hrs ' + min + 'min'
            } else {
                cell5.innerHTML = hrs + 'hr ' + min + 'mins' 
            }

        }
    }
}
