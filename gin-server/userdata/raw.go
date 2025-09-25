package userdata

import (
	"fmt"
	"strings"
)

func ManageData(data string) {
	test := setMap(splitData(data))
	fmt.Println(test[0]["Symbol"])
}

func splitData(data string) [][]string {
	var splitByTab [][]string
	newLine := strings.Split(data, "\n")
	// traverse through each line
	for x := 0; x < len(newLine); x++ {
		// split line to tabs
		splitByTab = append(splitByTab, strings.Split(newLine[x], "\t"))
	}
	return splitByTab
}

func setMap(data [][]string) []map[string]string {
	// if empty, return
	if data == nil {
		return nil
	}
	// create array of map (store all rows)
	var rows []map[string]string
	// traverse through each row (exception to col headers)
	for i := 1; i < len(data); i++ {
		// create map for each row)
		row := make(map[string]string)
		for j := 0; j < len(data[i]); j++ {
			row[data[0][j]] = data[i][j]
		}
		rows = append(rows, row)
	}
	return rows
}
