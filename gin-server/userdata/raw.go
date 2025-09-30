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
		return strings.TrimRight(colValue, " BP")
	case "Exit DateTime":
		return strings.TrimRight(colValue, " EP")
	case "Entry Efficiency":
		fallthrough
	case "Exit Efficiency":
		fallthrough
	case "Total Efficiency":
		return adjustPercentage(colValue)
	default:
		return colValue
	}
}

func adjustPercentage(colValue string) string {
	casted, _ := strconv.ParseFloat(strings.TrimRight(colValue, "%"), 32)
	return strconv.FormatFloat(casted*0.01, 'g', -1, 32)
}
