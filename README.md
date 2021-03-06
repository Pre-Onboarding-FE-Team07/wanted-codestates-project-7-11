# wanted-codestates-project-7-11
사용자가 입력한 **성향 진단 결과값**을 기업 성향 진단 결과와 비교하여 **그래프**로 보여주는 서비스입니다. 

## 사용한 기술 스택
<img src="https://img.shields.io/badge/Vue-40B983.svg?&style=for-the-badge&logo=vue.js&logoColor=fff"/> <img src="https://img.shields.io/badge/SCSS-CE699B.svg?&style=for-the-badge&logo=SASS&logoColor=fff"/> <img src="https://img.shields.io/badge/Chart.js-FF787C.svg?&style=for-the-badge&logo=Chart.js&logoColor=fff"/> 

## 프로젝트 실행 방법

- 배포 사이트 : https://personality-test.surge.sh/
- 로컬 :  
1. `git clone https://github.com/Pre-Onboarding-FE-Team07/wanted-codestates-project-7-11.git`
2. `npm install`
3. `npm run dev`

   
## 프로젝트 구조

```
--📁 src
  ---📁 assets : 이미지 asset 폴더 
  ---📁 components : 컴포넌트 폴더
  ---📁 data : 데이터 폴더
  ---📁 scss: scss style 파일 폴더
  ---📁 utils: 모듈화된 함수 폴더
```

## 팀 멤버

| 이름                                       | 직책 | 역할                                       |
| ------------------------------------------ | ---- | ----------------------------------- |
| [🚀심채윤](https://github.com/Lela12)      | 팀장 |      헤더 및 탭 컴포넌트 구현        |
| [⚡️박진용](https://github.com/jinyongp)   | 팀원 |  추천 검색어 기반 검색창 구현    |       
| [🎨문선경](https://github.com/dev-seomoon) | 팀원 | 개발 환경 설정 및 펜타곤 차트 구현       |
| [✏️예효은](https://github.com/ye-yo)       | 팀원 |   도넛 차트 구현          |
| [🔨이예지](https://github.com/Lee-ye-ji)   | 팀원| 개발 환경 구축 및 바 차트 구현 |


---

## 구현한 기능 목록
- 추천 검색어 기반 검색창
- 펜타곤 차트
- 탭 클릭을 통한 차트 데이터 변경
- 바 차트
- 도넛차트(추가 구현)
---


## 심채윤
헤더 및 탭 컴포넌트 구현

### 구현한 방법
헤더 
- `window.location.reload()`를 사용하여 다시 진단하기를 클릭시 페이지가 reload 되게 구현하였습니다. 

탭
- `v-for`를 사용하여 3개의 탭 버튼을 생성하였고, 3개의 탭 버튼에는 해당하는 이미지와 제목이 들어가게끔 구현하였습니다. `@click`으로 클릭된 탭에 `active css`를 적용 시켜 클릭된 탭은 `background-color: white, color: black`으로  되게끔 설정하였습니다. `$emit` 메서드는 하위 컴포넌트에서 상위 컴포넌트로 이벤트를 전달하기 위한 방식으로 상위 컴포넌트는 하위 컴포넌트에서 전달하는 값을 전달 받을 수 있는데 이를 사용하여 `clickTab`을 부모 컴포넌트인 `App.vue`로 전달하였습니다.

### 어려웠던 점 (에러 핸들링)
`Vue`를 처음 접해봐서 문법과 기본 동작을 습득하는데 시간이 오래 걸렸습니다. `src`에 `assets`폴더를 만들어 이미지 파일들을 넣고 싶었는데 이미지가 불러와지지 않는 오류가 발생했습니다. `file-loader`를 설치한 뒤, `webpack.config.js` 안에 아래와 같이 코드를 넣어주어 이미지를 불러와질 수 있게 되었습니다. [참고한 링크](https://developpaper.com/import-picture-resource-404-to-display-object-20module-404-not-found/)
```
{
        Test: / \ (JPE? G|png|gif) $/ I, // image file
        use: [
      {
        loader: 'url-loader',
        options: {
          limit: 10240,
          fallback: {
            loader: 'file-loader',
            options: {
              name: 'img/[name].[contenthash:8].[ext]',
+              esModule: false
            }
          },
+          esModule: false
        }
      }
    ],
    exclude: /node_modules/
}
```


## 박진용

### 구현한 방법

[제출한 PR 목록](https://github.com/Pre-Onboarding-FE-Team07/wanted-codestates-project-7-11/pulls?q=is%3Apr+sort%3Aupdated-desc+is%3Aclosed+author%3Ajinyongp)

추천 검색어 기반의 기업 검색창([SearchBar.vue](./src/components/SearchBar.vue))을 구현했습니다. 구현한 내용은 다음과 같습니다.

- 검색 기능
  - fuzzy 문자열 검색을 지원합니다. 이를 위한 정규표현식은 [`search.js`](./src/utils/search.js)에서 구현했습니다. 문자 사이마다 `.*?`을 삽입하여 떨어진 문자라도 검색할 수 있도록 했고, 한글 초성이나 부분 음절이 입력되어도 그를 포함하는 음절이 검색될 수 있도록 구현했습니다.
  - `v-modal.trim` 속성을 이용해 자동으로 trim 처리되도록 했습니다.
  - 엔터 키를 통해 검색합니다. 검색하면 `search` 이벤트가 발생합니다.
  - 매 입력마다 추천 검색어를 추립니다.
  - `x` 버튼을 클릭하면 `reset` 이벤트가 발생하고 검색창을 초기화합니다.

- 선택 모드
  - 마우스와 키보드를 사용하여 추천 검색어를 선택할 수 있습니다.
  - 마우스를 움직이면 마우스 모드로, 키보드를 제어하면 키보드 모드로 자동 전환합니다.
  - 키보드 모드일 때 위, 아래 키로 추천 검색어를 선택할 수 있고, 엔터 키로 검색할 수 있습니다.
  - 키보드로 제어할 때 `scrollIntoView`를 이용해 스크롤 정중앙에 추천 검색어가 위치하도록 하여 편의성을 높였습니다.

- 추천 검색어
  - 추천 검색어 목록에 존재하는 기업만 검색할 수 있습니다.
  - 추천하는 검색어가 없다면, `해당 기업 정보가 없습니다.` 메시지를 띄웁니다.
  - 아무 검색어나 입력했다면, 최상단에 위치한 추천 검색어로 검색합니다.

### 어려웠던 점 (에러 핸들링)

- `삼ㅅ`까지 작성했을 때 추천 검색어로 `삼성전자`가 추려지지 않는 문제가 있었습니다. 이 문제를 해결하기 위해 fuzzy 검색 기능을 적용했습니다. 한글의 경우, 초성이나 일부 음절만으로 이를 포함한 음절을 검색할 수 있게끔 했습니다. (e.g. 가 -> 각, 갈...)

```js
function koreanRegExp(ch) {
  const offset = utf16("가");
  if (/[가-힣]/.test(ch)) { // 음절을 처리합니다. ('가')
    const charCode = utf16(ch) - offset;
    if (charCode % 28 > 0) return ch; // 종성을 포함한 음절입니다. 완성된 음절이므로 그대로 반환합니다.
    const begin = String.fromCharCode(charCode + offset); // 시작 음절입니다. ('가')
    const end = String.fromCharCode(charCode + 27 + offset); // 종료 음절입니다. ('갛')
    return `[${begin}-${end}]`;
  } else if (/[ㄱ-ㅎ]/.test(ch)) { // 초성을 처리합니다. ('ㄱ')
    const begin = convertInitialToSyllable(ch); // 시작 음절입니다. ('가')
    const end = String.fromCharCode(utf16(begin) + 587); // 종료 음절입니다. ('깋')
    return `[${begin}-${end}]`;
  }
  return ch; // 한글이 아닌 문자는 그대로 반환합니다.
}
```

```js
function convertInitialToSyllable(ch) {
  const initial = ["ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄸ", "ㄹ", "ㅁ", "ㅂ", "ㅃ", "ㅅ"];
  const syllable = ["가", "까", "나", "다", "따", "라", "마", "바", "빠", "사"]; // 종성으로 사용되는 곁받침을 제외합니다.
  const initialToSyllable = initial.reduce((obj, init, i) => ({ ...obj, [init]: utf16(syllable[i]) }), {});

  // 'ㅅ' 이후부턴 초성('ㅅ')과 상응하는 음절('사')이 588만큼 동일한 거리를 가지고 있습니다.
  return (initialToSyllable[ch] || (utf16(ch) - utf16("ㅅ")) * 588 + initialToSyllable["ㅅ"]);
}
```

## 문선경

사용자의 성향 진단 결과와 기업의 성향을 시각화하여 비교할 수 있는 펜타곤 차트 구현.

### 구현한 방법

- chart.js의 Radar chart를 사용해 펜타곤 차트를 구현했습니다.
    
    vue3 버전에서 chart.js를 사용하기 위해 vue-chart-3 패키지를 사용했습니다. 
    
    ```jsx
    import { defineComponent } from 'vue';
    import { RadarChart } from 'vue-chart-3';
    import { Chart, registerables } from 'chart.js';
    
    Chart.register(...registerables);
    
    export default defineComponent({
      name: 'ChartPentagon',
      components: { RadarChart },
    	// ...
    ```
    

- setup() 메소드에서 `userResult`, `enterpriseResult()` props를 인자로 받아 컴포넌트 셋팅 작업을 해주었습니다.

- RadarChart는 options과 chartData를 props으로 받는 컴포넌트이기 때문에,  
    setup()에서 options 값과 chartData 값을 반환해 RadarChart 컴포넌트에 적용했습니다.  
    (setup()에서 반환한 데이터는 data()에서 반환한 데이터처럼 사용 가능)
    
    ```jsx
    <RadarChart :chart-data="chartData" :options="options" />
    
    setup() {
    	// const options = ...;
    	// const chartData = ...;
    	return { options, chartData };
    }
    ```
    

- Chart.js 공식문서를 참고해서, 과제에 제시된 펜타곤 차트와 최대한 유사하게 차트를 구현했습니다.

### 어려웠던 점 (에러 핸들링)

- Vue.js를 이번 과제를 하면서 처음 사용해봐서, Vue의 기본적인 동작 방식과 사용 방법을 파악하는 데 시간이 조금 소요되었습니다.
    
    참고한 사이트 : [Vue 공식문서(한국어 버전)](https://kr.vuejs.org/v2/guide/)
    
- 펜타곤 차트에 기본적인 데이터들을 나타내는 건 어렵지 않았지만, 과제에 제시된 펜타곤 차트와 동일하게 스타일링 하는 부분이 어려웠습니다.
    예를 들어서 Radar 차트에 기본적으로 들어가는 범례를 제거하고 싶은데,  
    범례를 제거하려면 차트 옵션 안의 플러그인 객체 안에서 `legend` 객체의 `display` 속성을 `false` 로 설정해야 했습니다.  
    그 외에도 angleLines, grid, ticks, scale, scales 등 차트 용어를 정확히 알아야 공식 문서에서 해당하는 속성을 찾을 수 있는 등,  
    options 설정 방법이 직관적이지 않고 options 객체 내부 중첩도 많아서  
    공식문서를 꼼꼼히 살펴보더라도 원하는 옵션 설정 방법을 바로 알아내기가 어려웠습니다.  
    공식문서와 함께 깃허브에서 레이더차트 구현 예제를 찾아보면서 구현했습니다.  
    
    참고한 사이트 : [Chart.js 공식문서](https://www.chartjs.org/docs/latest/)


## 예효은
선택한 기업과의 매칭률을 보여주는 도넛 차트 구현

### 구현한 방법
차트 구현을 3명이서 진행하게 되어 저는 추가로 새로운 차트를 만들어보기로 했습니다. radar, bar 차트 외에 여러 가지 차트 중 도넛 차트가 현재 보유한 데이터로 표현하기 좋을 것 같아 선택하였습니다. 도넛 차트에 표현할 데이터는 고심끝에 현재 선택한 기업과의 매칭률을 보여주는 것으로 결정했고, 다른 차트가 선택한 기업에 따라 변화하는 차트임으로 저 역시 유사하게 동작할 수 있도록 차트 주제를 결정하였습니다. 
`setup` 이라는 Composition API를 사용하여 내부에서 `computed`,`watch` 메소드등을 모두 사용할 수 있었고, 이를 활용하여 기업 데이터가 변경될 때마다 매칭률을 계산하여 차트를 재렌더링 하도록 만들었습니다.
매칭률은 `a / b * 100`으로 계산할 수 있으므로 각 항목(aggressive, confident 등..)별로 계산한 뒤, `항목별 나눗셈 결과합 / 항목의 개수 * 100`과 같은 계산 방식으로 매칭률을 도출했습니다. 또한 사용자의 점수가 기업의 점수보다 높을 경우 나눗셈 결과값이 1이 넘어 최종 매칭률이 100%가 넘을 수 있기 때문에 1이 넘어가는 값에 대해 값을 조정하는 등의 추가적인 연산을 거쳤습니다.


### 어려웠던 점 (에러 핸들링)
#### 1. vue.js, chart.js, scss 사용
`Vue.js` 및 `SCSS`는 이전에 to-do list 구현을 개인적으로 해 본 경험이 있는데 이번에 다시금 공부해보게 되었습니다. chart.js의 경우 자바스크립트 웹 사이트 개발 시에 사용해보았었는데 vue에서 사용하기 위해서는 추가적으로 `vue-chartjs`라는 라이브러리 설치가 필요했고 사용해보니 `vue-chartjs`가 최신 버전의 vue3를 지원하지 않는다는 것을 알게되어 이를 지원하는 `vue-chart-3` 라이브러리를 사용하였습니다.

#### 2. 코드 리팩토링
처음 차트 컴포넌트 구현 시에는 `setup`함수를 사용하지 않고 `methods`, `watch` 등의 함수들을 사용하여 구현했었습니다. 보다 익숙한 함수들을 사용해서 구현을 완료하였으나 `vue-chart-3` 공식문서의 예제코드에서는 `setup` 함수를 사용한 것을 보고 어떤 함수인지 궁금하여 개인적으로 찾아보게되었습니다. 그러다 `setup`이라는 함수는 `vue3`부터 등장한 composition API 중 하나이며 이전 버전에서 `data, methods, watch, computed`를 별도로 작성하는 것을 `setup`함수 내에서 하나로 모아 작성이 가능하다는 것을 알게되었습니다. 이미 코드를 완성하긴 했지만 이번에 Vue3를 사용하였기 때문에 최신 버전의 장점을 활용해보자는 마음도 있었고, `setup` 함수의 기능 자체가 무척 흥미로워서 코드를 리팩토링해보게 되었습니다. 

직접 구현해보니 `setup` 함수 내에서 `computed watch` 등의 함수 등을 사용하는 것은 무척 간단했고, 컴포넌트에서 사용할 데이터를 `ref`, `reactive` 로 선언하여 마지막에 return 해준다는 것이 중요하게 생각되었습니다. `ref`와 `reactive`는 모두 변경사항이 추적되는 반응 개체를 만들기 위한 방식으로 `ref`는 숫자, 문자열, boolean 값을, `reactive`는 object를 저장하기 위해 사용되기 때문에 이를 활용하여 `matchRate`나 `chartData` 등을 저장하여 처리하였습니다.

#### 3. 차트 반응형
차트가 윈도우 리사이징에 따라 줄어든 후 윈도우 사이즈가 확장되어도 다시 사이즈가 조정되지 않는 문제가 있어 원인 분석 및 해결방법을 찾아보았습니다. 
반응형을 위한 `responsive`값은 default가 `true`이기 때문에 문제가 없었으며 리사이징 시의 종횡비 유지 옵션인 `maintainAspectRatio`를 `false` 로 변경해주어야 한다는 것을 알게되었습니다. 종횡비 유지 옵션을 false로 설정할 경우 차트의 사이즈가 상위 컨테이너 요소의 사이즈에 따라 자동 조정되어 원하는 결과를 얻을 수 있었습니다.



## 이예지

데이터 결과값을 바 그래프로 표시

### 구현한 방법
[Chart.js](https://www.chartjs.org/docs/latest/)의 문서와 [Vue Chart.js example](https://codesandbox.io/examples/package/vue-chartjs)을 보면서 해당 내용을 빠르게 습득하고 이해하려고 노력하였습니다. `indexAxis: "y"` 를 이용하여 Horizontal Bar Chart 형태로 변경해주었고, 라벨을 없애기 위해서 아래의 코드와 같이 사용하였습니다.
```
plugins: {
  legend: false,
},
```
그 외의 행과 열에 대한 줄을 없애기 위해서 아래의 코드를 적용하였습니다.
```
scales: {
        x: {
          display: false,
        },
        y: {
          display: false,
        },
      },
```
이외의 여러가지 요소들은 검색을 통해 찾아가면서 구현하려고 노력하였습니다. 
또한 기존에는 한 파일에서 코드를 작성하였는데 완성하고 나니 코드의 길이가 길어져서 해당 내용을 `ChartBarView.vue` 와 `ChartBar.vue` 로 나누었습니다. 

### 어려웠던 점 (에러 핸들링)
#### Bar Chart 행과 열 선 부분
기존의 라이브러리를 활용하여 하는 방법은 없을까 고민하며 많이 찾기도 하였지만 결국에는 직접 구현해야겠다는 생각을 하게 되었습니다. 처음에는 [Chart.js](https://www.chartjs.org/docs/latest/)속성을 활용하면 되지 않을까라는 생각에 문서를 읽어봤지만 어떻게 활용을 해야할지 감이 잡히지 않았습니다. 그래서 검색 결과 시에 [chartjs-plugin-annotation](https://www.chartjs.org/chartjs-plugin-annotation/latest/guide/) 라이브러리를 이용하는 방법도 알게되었습니다. 하지만 vue version 3과에 대해 호환되지 않는 문제인지 아무런 에러 없이 바 차트만 나오고 어노테이션은 적용이 되지 않는 다는 것을 알게되었습니다. 그래서 결국에는 직접 구현해야겠다라는 생각으로 `<div></div>`를 이용하여 선을 그렸습니다. 세로 축에는 하나이므로 `border-left` 속성을 이용하여 그렸고, 가로는 `for`문을 이용하여 `border-bottom` 속성을 이용하여 선을 그릴 수 있었습니다.

#### 높은 점수 기준으로 색깔 표시
개인 점수 중 높은 점수 쪽 기준값을 '초록색'으로 변환하여 표시해야하는 부분에서 어려움을 겪었습니다. 처음에는 이 둘의 값을 어떻게 비교하지에 대한 막막함이 있었습니다. 둘을 비교하기 위해 매개변수로 받고 결과값을 적용하는 방법보다는 각 바의 양쪽 점수가 총 합이 10이어야 하므로 숫자 5를 기준으로 둔다면 더 편리하게 높은 점수 기준을 표시할 수 있을 것 같았습니다. 그래서 그 방법을 적용하기 위해 아래와 같은 코드로 작성하였고, 결과가 잘 표시되는 것을 확인할 수 있었습니다.
```js
selectStandardColor(num) {
      let color = "color:#25BB6A";
      if (num < 5) {
        color = "color:#000";
      }
      return color;
    },
```
