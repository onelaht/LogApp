package userdata

import (
	"strings"

	"strconv"
)

func ManageData(data string) []map[string]string {
	return setMap(splitData(data))
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
			if data[i][0] == "" {
				continue
			}
			row[data[0][j]] = adjustFormatting(data[0][j], data[i][j])
		}
		if len(row) > 0 {
			rows = append(rows, row)
		}
	}
	return rows
}

func adjustFormatting(colType string, colValue string) string {
	switch colType {
	case "Entry DateTime":
		return adjustEndString(colValue, " BP")
	case "Exit DateTime":
		return adjustEndString(colValue, " EP")
	case "Entry Efficiency":
		return adjustPercentage(colValue)
	default:
		return colValue
	}
}

func adjustEndString(colValue string, value string) string {
	after, found := strings.CutSuffix(colValue, value)
	if found {
		return after
	}
	return colValue
}

func adjustPercentage(colValue string) string {
	casted, _ := strconv.ParseFloat(adjustEndString(colValue, "%"), 32)
	return strconv.FormatFloat(casted*0.01, 'g', -1, 32)
}
