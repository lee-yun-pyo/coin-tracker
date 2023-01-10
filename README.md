# Coin Tracker
**react를 활용한 Coin Tracker 구현** 
<br />
https://lee-yun-pyo.github.io/coin-tracker/#/
<br />
<br />

## 📌 Using
- react-router
- react-router-dom
- styled components
- react-query
- Apexcharts
- Recoil
- Typescript 
<br />

## Route
- `/` Home 화면(코인 목록 제공)
- `/pages/:page` 페이지 별 코인목록 제공
- `/:coinId` 특정 코인 정보 제공
- `/:coinId/chart` 특정 코인 시세 라인 차트 제공
- `/:coinId/candle-stick` 특정 코인 시세 캔들 차트 제공
- `/:coinId/price` 특정 코인 가격 변화율 정보 제공
<br />

## 🎨 UI
**1. Home** `/`
<br />

<img src="https://user-images.githubusercontent.com/41375597/211523167-73c83faf-ae03-4ba9-beb3-086692f2079d.JPG" width=400 />
<img src="https://user-images.githubusercontent.com/41375597/211523225-1821c80c-8e4d-474c-a682-445a770d5a42.JPG" width=400 />

**2. coin** `/:coinId`
<br />

<img src="https://user-images.githubusercontent.com/41375597/211523290-c649d9df-a1fd-43f9-a18d-90cb0f5bfe87.JPG" width=400 />

**3. Line-chart** `/:coinId/chart`
<br />

<img src="https://user-images.githubusercontent.com/41375597/211523577-23cde38f-bdec-4106-8d1a-62c39f7a6688.JPG" width=400 />

**4. candle-stick** `/:coinId/candle-stick`
<br />

<img src="https://user-images.githubusercontent.com/41375597/211523653-cdb97c0e-81c9-42f1-ae25-bb5f753a00a4.JPG" width=400 />

**5. price** `/:coinId/price`
<br />

<img src="https://user-images.githubusercontent.com/41375597/211523731-24febd85-576b-4863-b519-bb02fcbfdb3e.JPG" width=400 />

**6. 다크 모드**
<br />

<img src="https://user-images.githubusercontent.com/41375597/211523772-7c7dfa91-426f-4c5d-afa3-78ba536105fc.JPG" width=400 />
<br />

## 📝 기능
> **Home**
- API를 fetch하여 99개의 coin을 가져와서 33개씩 페이지마다 출력
- `Link`를 이용하여 페이지 번호 클릭 시 해당 컴포넌트 `<CoinList />` 만 re-render
<br />

> **Coin 세부 화면**
- API를 fetch하여 코인의 세부정보와 세부 가격 정보를 가져옴
- `Reference Link`는 깃허브, 레딧, 유튜브, 페이스북 중 API에서 제시하고 있는 요소만 출력
<br />

> **Line Chart (Apexchart 이용)**
- 현재부터 지난 20일 치의 가격정보를 가져오는 API를 fetch하여 각 날의 종가(close price)를 그래프화. 
- `coinId`는 사이트 URL의 파라미터
- 그래프의 현재시점의 가격이 20일 전의 시점보다 크거나 같으면 그래프를 빨간색(#DA5157)으로 표시, 작으면 파란색으로 표시(#4880EE) 
- 만약 API fetch 결과 데이터가 없으면 `“Price data not found”` 출력 
<br />

> **Candle Stick (Apexchart 이용)**
- Line chart와 마찬가지로 지난 20일치의 가격정보를 가져오는 API를 fetch하여 각 날의 시가, 고가, 저가, 종가 (open, high, low, close)를 차트화
- 만약 API fetch 결과 데이터가 없으면 `“Price data not found”` 출력 
<br />

> **Price**
- API를 fetch하여 지난 시간대별 대비 종가 변화율을 가져옴
  (30분, 1시간, 12시간, 7일, 30일, 1년 대비)
- 변화율이 양수면 `up icon`과 함께 빨간색 #DA5157 으로 출력
- 변화율이 음수면 `down icon`과 함께 파란색 #4880EE 으로 출력
<br />

> **다크 모드 (Recoil 사용)**
- `textColor`: 글자색
- `bgColor`: 배경색
- `divColor`: 각 컴포넌트의 배경색
- `accentColor`: Coin 화면에서 `Tab` 버튼 클릭 시 글자 색
- `grayDiv`: `Reference Link` 버튼 색
<br />

## 📑 참고 API
- `https://api.coinpaprika.com/v1/coins`: 99개의 Coin 가져옴
- `https://api.coinpaprika.com/v1/coins/${coinId}`: `coinId`에 해당하는 coin 정보 가져옴
- `https://api.coinpaprika.com/v1/tickers/${coinId}`: `coinId`에 해당하는 coin 시세 정보 가져옴
- `https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinId}`: `coinId`에 해당하는 coin의 20일치 가격 정보 가져옴
