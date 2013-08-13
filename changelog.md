## August 13, 2013
### Charting Intake

D3 charts need an array of objects, and ideally two things to chart: the thing itself (aka labels) and the corresponding value (aka units). Your data usually contains more than D3 needs to make the chart, so you have to tell it what to chart. 

Previously Sheetsee required you pass your data through a function, `addUnitsAndLabels()` which took in your data and the things you wanted to chart, reformatted your data for you so that you could pass it into one of the d3 charts. This is one more step than actually needs to happen.

Now Sheetsee just asks for what you want your _labels_ and _units_ to be in the options you give it when calling the chart function. It then sorts the data correctly on the inside of the chart function. Yay, easier! 

Thanks @maxogden for the help with this.
