export const style = {
  body: {
    flex: 1,
    backgroundColor: '#030406',
  },
  container: {
    margin: 10
  },
  whiteText: {
    color: '#f6f6f8'
  },
  mainTextColor: {
    color: '#e5e6e6'
  },
  TransparentTextColor: {
    color: '#5a626b'
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    backgroundColor: '#007aff'
  }
}

export const defaultFont = {
  normal: 'USBill-Regular',
  bold: 'USBill-Bold'
}

export const menu = {
  text: [
    style.mainTextColor,
    {
      fontSize: 16,
      paddingLeft: 5,
      paddingTop: 15,
      paddingBottom: 15,
      fontFamily: defaultFont.normal
    }
  ],
  icon: {
    color: '#4d5662',
    paddingLeft: 50,
    transform: [{ translateY: 13 }]
  }
}
