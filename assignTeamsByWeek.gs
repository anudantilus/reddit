function createWeeklyTeams() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("control");
  var rangeControls = sheet.getRange(1,2,2,1);
  var controls = rangeControls.getValues();
  var totalWeeks = controls[0][0];
  var totalGroups = controls[1][0];
  
  var groups = {};
  var weekAssign = {};
  
  var i;
  for (i = 0; i < totalGroups; i++) {
    row = 4; // skip the header
    column = i + 1;
    numRows = sheet.getLastRow();
    values = sheet.getRange(row, column, numRows).getValues();
    valuesClean = removeEmpty(values);
    name = "Group " + column;
    groups[name] = valuesClean;
  }
  
  var j;
  for (j = 0; j < totalWeeks; j++) {
    name = "Week " + (j+1);
    weekAssign[name] = [];
    len = Object.keys(groups).length;
    for (k = 0; k < len; k++) {
      group = Object.keys(groups)[k];
      if (groups[group].length > j) {
        weekAssign[name].push(groups[group][j]);
      }
      else {
        pos = j - groups[group].length;
        while (pos >= groups[group].length) {
          pos = pos - groups[group].length;
        }
        weekAssign[name].push(groups[group][pos]);
      }
    }
  }
  return weekAssign;
}

function removeEmpty(arr) {
  var i;
  for (i = 0; i < arr.length; i++) {
      if (arr[i] == "") {
        spliceCount = arr.length - arr[i];
        arr.splice(i, spliceCount);
      }
      else {
      }
    }
  return arr
}

function setGroups() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Weekly Assignments");
  sheet.clearContents();
  
  var obj = assignGroups();
  
  var i;
  
  for (i = 0; i < Object.keys(obj).length; i++) {
    title = Object.keys(obj)[i];
    row = 1;
    column = i + 1;
    numRows = obj[title].length;
    sheet.getRange(row, column).setValue(title);
    sheet.getRange(row+1, column, numRows).setValues(obj[title]);
  }
}
