export const updateObject = (oldObject: Object, updatedProperties: Object): any => {
	return {
		...oldObject,
		...updatedProperties
	};
};

export const getElementsByXPath = (xpath: string, contextNode?: Document) =>
{
	let xpathResult = null;
	if(contextNode === undefined)
		xpathResult = document.evaluate(xpath, document, null, XPathResult.ANY_TYPE, null);
	else
		xpathResult = contextNode.evaluate(xpath, contextNode, null, XPathResult.ANY_TYPE, null);

	let array = [];
	let element;
	element = xpathResult.iterateNext();
	while(element)
	{
		array[array.length] = element;
		element = xpathResult.iterateNext();
	}
	return array;
}

export const getElementByXPath = (xpath: string, contextNode?: Document) =>
{
	let xpathResult = null;
	if (contextNode === undefined)
		xpathResult = document.evaluate(xpath, document, null, XPathResult.ANY_TYPE, null);
	else
		xpathResult = contextNode.evaluate(xpath, contextNode, null, XPathResult.ANY_TYPE, null);
	return xpathResult.iterateNext();
}
