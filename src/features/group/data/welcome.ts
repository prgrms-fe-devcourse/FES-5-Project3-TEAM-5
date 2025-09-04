export const welcomeMessages = [
  '오늘도 또 모아볼까요?',
  '다시 시작해볼까요?',
  '오늘은 어떤 소비가 있었나요?',
  '차곡차곡 모아봐요!',
  '모으는 재미, 시작해요!',
  '다시 한 번 가계부 GO!',
  '기록이 재산입니다',
  '꾸준함이 답이에요!',
  '오늘의 지출도 기록해요!',
  '지출 관리, 함께 해요!',
  '오늘도 현명한 소비를!',
  '멋진 하루 되세요'
]

export const getRandomMessage = () => {
  const index = Math.floor(Math.random() * welcomeMessages.length)
  return welcomeMessages[index]
}