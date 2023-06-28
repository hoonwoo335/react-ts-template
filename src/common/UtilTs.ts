import * as Define from "@common/Define";


//---------------------------------------------------------------------------
// time ago added by jerry_210804
import TimeAgo, { LocaleData } from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import { NavigateFunction } from "react-router-dom";

TimeAgo.addLocale(en as LocaleData);
const timeAgo = new TimeAgo('en-US');

//---------------------------------------------------------------------------
//콤마 표시 //num: 숫자 //1000 => 1,000
export function addComma (num: number|string) {
    if (num === undefined || num === 0){
        return num;
    }
    let tmpNum = num.toString();
    if (tmpNum.includes('.')) {
        const numArr = tmpNum.split('.');
        tmpNum = numArr[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "." + numArr[1];
        return tmpNum;
    }
    else
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

//숫자 축약 표시 //num: 숫자   //1000 => 1K
export function convShortNumber (num: number) {

    //숫자를 정수와 소수점으로 나누어 배열로 저장
    let strNum: string[] = num.toString().split('.');

    //단위 표시
    const unit = ['', 'K', 'M', 'G', 'T', 'P'];
    const unitNum = (strNum[0].length - 1) / 3;
    const unitIndex = parseInt(unitNum.toString());

    //축약한 나머지 값
    const shortNum = Number(strNum[0]) / Math.pow(1000, (unitIndex) );

    let ret = parseInt(String(shortNum)).toString() + unit[unitIndex];
    if (unitIndex === 0 && strNum[1] !== undefined){   //999이하일때 소수점이 있다면 소수점을 붙임
        ret = parseInt(String(shortNum)).toString() + strNum[1];
    }
    else{   //축약 표시
        ret = parseInt(String(shortNum)).toString() + ' ' + unit[unitIndex];
    }
    console.log("result: " + ret);

    return ret;
}

//타임존 표시   "+09:00"
export function getTimeZone () {

    const timezoneOffsetSeconds = -(new Date()).getTimezoneOffset() * 60;
    const timeZone = new Date(timezoneOffsetSeconds * 1000).toISOString().substring(11, 5);

    return "+" + timeZone;
}


//시간 포맷 스트링이 필요할 경우 사용
//HH : 24시간 표기, hh: 12시간 표기, mm: 분 표기, ss: 초 표기
//ex 1) hh:mm:ss => 11:22:33 AM
//ex 2) HH:mm:ss => 23:22:33
export const getTimeString = (date: Date, strTimeFormat: string) => {
    //시간
    let ret = strTimeFormat;

    let isHalfHour = false;
    let hour = date.getHours();
    if (strTimeFormat.indexOf("hh") !== -1){
        isHalfHour = true;
    }

    if (strTimeFormat.indexOf("HH") !== -1 || isHalfHour === true){
        if (isHalfHour === true){
            ret = ret.replace("hh", (hour % 12).toString().padStart(2,'0') );
        }
        else{
            ret = ret.replace("HH", hour.toString().padStart(2,'0') );
        }
    }

    if (strTimeFormat.indexOf("mm") !== -1){
        ret = ret.replace("mm", date.getMinutes().toString().padStart(2,'0') );
    }
    
    if (strTimeFormat.indexOf("ss") !== -1){
        ret = ret.replace("ss", date.getSeconds().toString().padStart(2,'0') );
    }

    if (isHalfHour === true){
        if (12 <= hour && hour <= 23 ){
            ret = ret + " PM"
        }
        else{
            ret = ret + " AM"
        }
    }

    return ret;
}

//날짜 및 시간 포맷 스트링이 필요할 경우 사용
//HH : 24시간 표기, hh: 12시간 표기, mm: 분 표기, ss: 초 표기
// "|" : 구분자
// ms : 월 짧은 표시 => Feb,    // ml : 월 긴 표시 => February
// ws : 요일 짧은 표시 => Tue,  // wl : 요일 긴 표시 => Tuesday
//ex 1) "ms,|ml,|,ws|,wl|YYYY|-MM|-DD|hh:mm:ss" => Feb,February,,Tue,Tuesday2021-02-2306:44:49 PM
export const getDateString = (date: Date, strDateFormat: string) => {
    // console.log("getDateString");
    // console.log("date = " + date);

    //ms,|ml,|,ws|,wl|YYYY-MM-DD|HH:mm:ss";

    if (strDateFormat.indexOf("ms") !== -1){
        return strDateFormat.replace("ms", date.toLocaleDateString('en-us', { month: 'short'}) );
    }
    else if (strDateFormat.indexOf("ml") !== -1){
        return strDateFormat.replace("ml", date.toLocaleDateString('en-us', { month: 'long'}) );
    }
    else if (strDateFormat.indexOf("ws") !== -1){
        return strDateFormat.replace("ws", date.toLocaleDateString('en-us', { weekday: 'short'}) );
    }
    else if (strDateFormat.indexOf("wl") !== -1){
        return strDateFormat.replace("wl", date.toLocaleDateString('en-us', { weekday: 'long'}) );
    }
    else if (strDateFormat.indexOf("YYYY") !== -1){
        return strDateFormat.replace("YYYY", date.getFullYear().toString() );
    }
    else if (strDateFormat.indexOf("MM") !== -1){
        return strDateFormat.replace("MM", (date.getMonth()+1).toString().padStart(2,'0') );
    }
    else if (strDateFormat.indexOf("DD") !== -1){
        return strDateFormat.replace("DD", date.getDate().toString().padStart(2,'0') );
    }
    else {
        return getTimeString(date, strDateFormat);
    }
}

//날짜 형식을 가져와야 할 경우 사용
//구분자 : '|'
//ex) getDateFormatString(new Date(2021, (6-1), 5, 17), "ml |DD, |YYYY, |hh:mm")
//ex) "ml |DD, |YYYY, |hh:mm" => June 5, 2021, 05:00 PM
export const getDateFormatString = (date: Date, dateFormatter: string) => {
    const formats = dateFormatter.split('|');

    let result = '';
    for (let i=0; i<formats.length; i++){
        result += getDateString(date, formats[i]);
    }
    return result;
}

// time add caculator by jerry_210302
export const addTime = (date: Date, paramType: string, param: number) => {
    let unit = 0;
    if (paramType === 'day') {
        unit = 1000 * 60 * 60 * 24;
    }
    else if (paramType === 'hour') {
        unit = 1000 * 60 * 60;
    }
    else if (paramType === 'minute') {
        unit = 1000 * 60;
    }
    return new Date(new Date(date).getTime() + unit * param);
}

// 문자열을 받아서 숫자로 된 문자만 반환하는 함수
// ex) "a1b2c3" => "123"
export const getNumber = (str: string) => {
    return str.replace(/\D/g, "");
}

//---------------------------------------------------------------------------
// 시간(날짜)과 시간(날짜) 사이의 남은시간 계산 by jerry_210302
export const getTimeGapHHmm = (currentDate: Date, expireDate: Date) => {
    const currDay = currentDate;//new Date();
    const expireDay = expireDate;//new Date("2021-03-04 23:30");

    let diff = expireDay.getTime() - currDay.getTime();
    //const diffDays = Math.floor((expireDay.getTime() - currDay.getTime()) / (1000 * 60 * 60 * 24));
    //diff -= diffDays * (1000 * 60 * 60 * 24);
    const diffHours = Math.floor(diff / (1000 * 60 * 60));
    diff -= diffHours * (1000 * 60 * 60);
    const diffMin = Math.floor(diff / (1000 * 60));
    diff -= diffMin * (1000 * 60);
    
    //console.log(`${diffDays < 10 ? `0${diffDays}` : diffDays}일 ${diffHours < 10 ? `0${diffHours}` : diffHours}시간 ${diffMin < 10 ? `0${diffMin}` : diffMin}분 ${diffSec < 10 ? `0${diffSec}` : diffSec}초`);
    const result = `${diffHours < 10 ? `0${diffHours}` : diffHours}:${diffMin < 10 ? `0${diffMin}` : diffMin}`;
    console.log(result);
    return result;
}

export const getTimeGapHHmmss = (currentDate: Date, expireDate: Date, minuteOnly: boolean) => {
    const currDay = currentDate;
    const expireDay = expireDate;

    //let diff = expireDay - currDay;
    let diff = expireDay.getTime() - currDay.getTime();
    const diffHours = Math.floor(diff / (1000 * 60 * 60));
    diff -= diffHours * (1000 * 60 * 60);
    const diffMin = Math.floor(diff / (1000 * 60));
    diff -= diffMin * (1000 * 60);
    const diffSec = Math.floor(diff / 1000);

    let timeValue;
    if (minuteOnly) {
        timeValue = `${diffMin < 10 ? `0${diffMin}` : diffMin}:${diffSec < 10 ? `0${diffSec}` : diffSec}`;
    }
    else {
        timeValue = `${diffHours < 10 ? `0${diffHours}` : diffHours}:${diffMin < 10 ? `0${diffMin}` : diffMin}:${diffSec < 10 ? `0${diffSec}` : diffSec}`;
    }
    
    return timeValue;
}

export const getTimeGapDDHHmmss = (currentDate: Date, expireDate: Date) => {
    const currDay = currentDate;
    const expireDay = expireDate;

    //let diff = expireDay - currDay;
    let diff = expireDay.getTime() - currDay.getTime();
    const diffDays = Math.floor((expireDay.getTime() - currDay.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays > 0) {
        diff -= diffDays * (1000 * 60 * 60 * 24);
    }
    const diffHours = Math.floor(diff / (1000 * 60 * 60));
    diff -= diffHours * (1000 * 60 * 60);
    const diffMin = Math.floor(diff / (1000 * 60));
    diff -= diffMin * (1000 * 60);
    const diffSec = Math.floor(diff / 1000);
    
    if (diffDays > 0) {
        return `${diffDays}D ${diffHours < 10 ? `0${diffHours}` : diffHours}:${diffMin < 10 ? `0${diffMin}` : diffMin}:${diffSec < 10 ? `0${diffSec}` : diffSec}`
    }
    else {
        return `${diffHours < 10 ? `0${diffHours}` : diffHours}:${diffMin < 10 ? `0${diffMin}` : diffMin}:${diffSec < 10 ? `0${diffSec}` : diffSec}`
    }
}

/*
브라우저 호환성 관련 이슈
IOS WKWebView 또는 Safari 브라우저 에서는 2021-03-05 13:30 이런 형식은 invalid date 리턴으로 오동작
예외) 2021-03-17T09:57:51.000+00:00 utc포맷 형식은 그대로 사용 가능
 "-" -> "/" 치환하여 처리
tempDate = tempDate.replace(/-/g, "/")
*/
export const validTimeFormat = (dateTime: string) => {
    if (dateTime.includes("T")) {
        return dateTime;
    }
    else if (dateTime.includes("-")) {
        return dateTime.replace(/-/g, "/");
    }
    return dateTime;
}


/*
UTC: 2021-08-04 08:41:42
GMT: ed Aug 04 2021 08:41:42 GMT+0900
서버에서 주는 시간은 UTC기준 인데 이걸 new Date하면 GMT시간으로 바뀐다.
getTimezoneOffset/60의 offset 값으로 setHours로 재설정 하여 처리하자. by jerry_210804
*/
export const getTimeAgo = (endDateTime: string) => {
    //console.log(endDateTime);
    const endDate = validTimeFormat(endDateTime);
    const utcDate = new Date(endDate);
    //console.log(utcDate);
    const hours = utcDate.getHours();
    const offset = new Date().getTimezoneOffset() / 60;
    //console.log(offset);
    utcDate.setHours(hours - offset);

    const temp = timeAgo.format(utcDate);
    return temp;
}

export const getTimeExpire = (endDateTime: string) => {
    const endDate = validTimeFormat(endDateTime);
    const expireTime = new Date(endDate);//UTC -> GMT return
    const nowTime = new Date();
    const hours = expireTime.getHours();
    const offset = nowTime.getTimezoneOffset() / 60;    
    expireTime.setHours(hours - offset);

    const timeLeft = getTimeGapHHmmss(nowTime, expireTime, false);

    if (timeLeft === "00:00:00" || timeLeft.includes('-')) {
        //이미 만료가 된 옥션 아이템인 경우
        return true;
    }
    return false;
}

//---------------------------------------------------------------------------
// 오브젝트에서 value로 key 값을 가져와야 할 경우 사용
// ex) getKeyByValue(Define.assetType, 121001) => "CP"
export const getKeyByValue = (type: any, value: any) => {
    return Object.keys(type).find(k=>type[k]===value);
}

// input 입력되는 문자(한글2byte,영문1byte)의 byte 길이 체크 추가 by jerry_210310
export const bytesValidationChk = (value: string, maxByte: number) => { 
    var codeByte = 0; 
    // input의 value 
    var targetVal = value; 

    // input.length만큼 반복 
    for (var i = 0; i < targetVal.length; i++) { 
        // 한글, 영문 등의 byte만큼 codeByte를 증가 
        var oneChar = escape(targetVal.charAt(i)); 
        // 한글 = 2byte 나머지 = 1byte 
        if (oneChar.length > 4) { 
            codeByte += 2; 
        } else { 
            codeByte++; 
        }  
    } 
    console.log(codeByte);

    // codyByte가 내가 지정한 maxByte보다 커지면 
    if (codeByte >= maxByte) { 
        return true;
    } 

    return false;
} 

//---------------------------------------------------------------------------
export const getByteInputValue = (value: string) => {
    var codeByte = 0; 
    // input의 value 
    var targetVal = value; 

    // input.length만큼 반복 
    for (var i = 0; i < targetVal.length; i++) { 
        // 한글, 영문 등의 byte만큼 codeByte를 증가 
        //var oneChar = escape(targetVal.charAt(i)); // deprecated
        var oneChar = encodeURI(targetVal.charAt(i)); 
        //console.log(oneChar);
        // 한글 = 2byte 나머지 = 1byte 
        if (oneChar.length > 4) { 
            codeByte += 2; 
        } else { 
            codeByte++; 
        } 
    } 
    
    return codeByte;
} 

//축약문자열 처리
//ex) getShortStr("abcde", 3) => "abc..."
export const getShortStr_original = (str: string, maxLen: number) => {
    if (!str || maxLen < 0){
        return str;
    } 

    if (str.length <= maxLen){
        return str;
    }

    return str.substring(0, maxLen) + "...";
}

export const getShortStr = (str: string, maxLen: number) => {
    if (!str || maxLen < 0){
        return str;
    } 

    // 2byte 관련 처리 추가
    const strLength = getByteInputValue(str);
    if (strLength <= maxLen){
        return str;
    }
    else {
        // 2byte상관없는 length값이 제한값보다 작은경우는 다음과 같이 처리
        if (str.length < maxLen) {
            return str.substring(0, str.length-(strLength-maxLen-3)) + "...";
        }
        else {
            return str.substring(0, maxLen-3) + "...";
        }
    }

    //return str.substr(0, maxLen) + "...";
}

// by jerry_210416
export const getBaseSplit = (base: string) => {
    let baseTmpArr: string[] = ['0','0','0'];
    if (base.length > 0) {
        let baseTmp = base.replace(/\[/g,''); // 대괄호 지우기 정규식
        baseTmp = baseTmp.replace(/\]/g,'');
        baseTmpArr = baseTmp.split(',');
    }
    return baseTmpArr;
}

export const getJsonStringFromFormData = (formData: FormData) => {
    var object: any = {};
    formData.forEach(function(value, key){
        object[key] = value;
    });
    var json = JSON.stringify(object);
    return json;
}

export const getFoldString = (src: string, len: number) => {
    if (src.length > len) {
        return src.substring(0, len) + '...';
    }
    else {
        return src;
    }
}

export const getDateOnly = (date: string) => {
    if (date.includes(" ")) {
        const temp = date.split(" ");
        if (temp.length > 1) {
            return temp[0].replace(/\-/g,'.');
        }
    }
    else if (date.includes("T")) {
        const temp = date.split("T");
        if (temp.length > 1) {
            return temp[0].replace(/\-/g,'.');
        }
    }
    else {
        return date.replace(/\-/g,'.');
    }
}

export const getDateTimeExpire = (endDateTime: string) => {
    if (endDateTime.length === 0) return false;

    const validEndDate = validTimeFormat(endDateTime);
    const expireTime = new Date(validEndDate);//UTC -> GMT return
    const nowTime = new Date();
    const hours = expireTime.getHours();
    const offset = nowTime.getTimezoneOffset() / 60;
    expireTime.setHours(hours - offset);
    const timeLeft = getTimeGapHHmmss(nowTime, expireTime, false);
    if (timeLeft === "00:00:00" || timeLeft.includes('-')) {
        return true;
    }
    else return false;
}

//---------------------------------------------------------------------------
// navigate template function
export const pagePush = (
    navigate: NavigateFunction, 
    pathName: string, 
    searchQuery: string, 
    stateDetail: any) => {
    if (searchQuery.length > 0) {
        navigate({
            pathname: pathName, 
            search: searchQuery
        }, 
        {
            state: { detail: stateDetail }
        });
    }
    else {
        navigate(pathName);
    }
}

export const pageReplace = (navigate: NavigateFunction, pathName: string) => {
    navigate(pathName, {replace: true});
}

export const pageBack = (navigate: NavigateFunction) => {
    navigate(-1);
}

//---------------------------------------------------------------------------
export const checkDeviceType = () => {
    //mobile or pc
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      return "MOBILE";
    }
    else {
        return "WEB";
    }
}

//---------------------------------------------------------------------------
export const utcTimeChange = (time: string) => {
	let dateTime = time;
	// 날짜와 시간사이에 있는 공백을 T로 치완
	if (dateTime.includes(" ")) {
		dateTime = dateTime.replace(/ /g, "T");
	}
	const date = new Date(dateTime+"Z");
	//const date = new Date(time+"Z");
	return date.toLocaleString()	
}