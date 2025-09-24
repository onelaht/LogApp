package userdata

import (
	"fmt"
	"strings"
)

func SplitData(data string) {
	var splitData [][]string
	newLine := strings.Split(data, "\n")
	//
	for x := 0; x < len(newLine); x++ {
		//
		splitData = append(splitData, strings.Split(newLine[x], "\t"))
	}
	//
	fmt.Println(splitData[0][0])
}
