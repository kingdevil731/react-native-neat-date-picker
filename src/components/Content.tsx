import { I18nManager, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useState } from 'react'
import { DaysArray } from '../hooks/useDaysOfMonth'
import { getTranslation } from '../lib/lib'
import ChangeYearModal from './ChangeYearModal'
import Key from './Key'
import { ColorOptions } from './NeatDatePicker.d'
import MDicon from 'react-native-vector-icons/MaterialIcons'

I18nManager.allowRTL(false)

const Content = ({
  language,
  mode,
  onPrev,
  onNext,
  onConfirmPress,
  onCancelPress,
  colorOptions,
  chooseYearFirst,
  daysArray,
  btnDisabled,
  displayTime,
  setDisplayTime,
  output,
  setOutput,
  headerOrder, // if present with value alternative we change the value to to be e.g: Jan/January 2024, default is 2024 Jan/January.
  monthLength // short or long
}: any) => {
  const [showChangeYearModal, setShowChangeYearModal] = useState(chooseYearFirst || false)

  // destructure colorOptions
  const {
    backgroundColor,
    headerColor,
    headerTextColor,
    changeYearModalColor,
    weekDaysColor,
    dateTextColor,
    selectedDateTextColor,
    selectedDateBackgroundColor,
    confirmButtonColor
  } = { ...defaultColorOptions, ...colorOptions as ColorOptions }
  const sevenDays = language
    ? getTranslation(language).weekDays
    : getTranslation('en').weekDays
  const hasDate = daysArray.length !== 0

  const getFormattedMonth = () => {
    const months = monthLength === 'short' ? 'months' : 'longMonths'
    // We load the language from the props, if it is not present we use the default language 'en'
    return (getTranslation(language || 'en')[months] as any)[daysArray[10].month]
  }

  const formattedMonth = hasDate ? getFormattedMonth() : ''
  const formattedYear = hasDate ? daysArray[10].year : ''

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={[styles.header, { backgroundColor: headerColor }]}>

        {/* last month */}
        <TouchableOpacity style={styles.changeMonthTO} onPress={onPrev} disabled={btnDisabled} >
          <MDicon name={'keyboard-arrow-left'} size={32} color={headerTextColor} />
        </TouchableOpacity>

        {/* displayed year and month */}
        <TouchableOpacity onPress={() => { setShowChangeYearModal(true) }}>
          <Text style={[styles.header__title, { color: headerTextColor }]}>
            { headerOrder === 'alternative'
              ? `${formattedMonth} ${formattedYear}`
              : `${formattedYear} ${formattedMonth}`
            }
          </Text>
        </TouchableOpacity>

        {/* next month */}
        <TouchableOpacity style={styles.changeMonthTO} onPress={onNext} disabled={btnDisabled} >
          <MDicon name={'keyboard-arrow-right'} size={32} color={headerTextColor} />
        </TouchableOpacity>
      </View>

      <View style={styles.keys_container}>

        {/* week days  */}
        {sevenDays.map((weekDay: string, index: number) => (
          <View style={styles.keys} key={index.toString()}>
            <Text style={[styles.weekDays, { color: weekDaysColor }]}>
              {weekDay}
            </Text>
          </View>
        ))}

        {/* every days */}
        {daysArray.map((Day: DaysArray, i: number) => (
          <Key key={Day.year.toString() + Day.month.toString() + i.toString()}
            Day={Day}
            mode={mode}
            output={output}
            setOutput={setOutput}
            colorOptions={{
              dateTextColor,
              backgroundColor,
              selectedDateTextColor,
              selectedDateBackgroundColor
            }}
          />
        ))}
      </View>
      <View style={styles.footer}>
        <View style={styles.btn_box}>
          <TouchableOpacity style={styles.btn} onPress={onCancelPress}>
            <Text style={styles.btn_text}>
              {language ? getTranslation(language).cancel : getTranslation('en').cancel}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={onConfirmPress}>
            <Text style={[styles.btn_text, { color: confirmButtonColor }]}>
              {language ? getTranslation(language).accept : getTranslation('en').accept}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <ChangeYearModal
        isVisible={showChangeYearModal}
        dismiss={() => { setShowChangeYearModal(false) }}
        displayTime={displayTime}
        setDisplayTime={setDisplayTime}
        colorOptions={{
          primary: changeYearModalColor,
          backgroundColor
        }}
      />
    </View>
  )
}

export default Content



const styles = StyleSheet.create({
  container: {
    width: 328,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    overflow: 'hidden'
  },
  header: {
    flexDirection: 'row',
    width: '100%',
    height: 68,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8
  },
  header__title: {
    fontSize: 24,
    color: '#fff',
    fontWeight: '500'
  },
  keys_container: {
    width: 300,
    height: 264,
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  weekDays: {
    fontSize: 16
  },
  keys: {
    width: 34,
    height: 30,
    borderRadius: 10,
    marginTop: 4,
    marginHorizontal: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  footer: {
    width: 300,
    height: 52,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  btn_box: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 8,
    paddingRight: 8,
    justifyContent: 'space-between'
  },
  btn: {
    height: 44,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btn_text: {
    fontSize: 18,
    color: '#777'
  },
  changeMonthTO: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    padding: 4,
    borderColor: 'black'
  }
})

// Notice: only six-digit HEX values are allowed.
const defaultColorOptions = {
  backgroundColor: '#ffffff',
  headerColor: '#4682E9',
  headerTextColor: '#ffffff',
  changeYearModalColor: '#4682E9',
  weekDaysColor: '#4682E9',
  dateTextColor: '#000000',
  selectedDateTextColor: '#ffffff',
  selectedDateBackgroundColor: '#4682E9',
  confirmButtonColor: '#4682E9'
}