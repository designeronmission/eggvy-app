import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Svg, { Path, G, ClipPath, Rect } from 'react-native-svg';

const { width } = Dimensions.get('window');

const NumericKeypad = () => {
  const [currentValue, setCurrentValue] = useState('0');

  const handleNumberPress = (value) => {
    if (currentValue === '0') {
      setCurrentValue(value);
    } else if (currentValue.length < 12) {
      setCurrentValue(prev => prev + value);
    }
  };

  const handleDelete = () => {
    if (currentValue.length > 1) {
      setCurrentValue(prev => prev.slice(0, -1));
    } else {
      setCurrentValue('0');
    }
  };

  const handleClear = () => {
    setCurrentValue('0');
  };

  const handleDone = () => {
    console.log('Done clicked. Value:', currentValue);
    alert(`Value entered: ${currentValue}`);
    // You can add your own logic here
  };

  const handleMove = () => {
    console.log('Move clicked');
    alert('Move action triggered');
    // You can add your own logic here
  };

  const handleAssign = () => {
    console.log('Assign clicked');
    alert('Assign action triggered');
    // You can add your own logic here
  };

  const handleDetails = () => {
    console.log('Details clicked');
    alert('Details action triggered');
    // You can add your own logic here
  };

  // SVG Icons Components
  const DeleteIcon = () => (
    <Svg width={16} height={20} viewBox="0 0 16 20" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.88242 10.0044L13.1854 15.3074C13.4668 15.5888 13.8485 15.7469 14.2464 15.7469C14.6444 15.7469 15.026 15.5888 15.3074 15.3074C15.5888 15.026 15.7469 14.6444 15.7469 14.2464C15.7469 13.8485 15.5888 13.4668 15.3074 13.1854L10.0024 7.88243L15.3064 2.57943C15.4457 2.4401 15.5561 2.2747 15.6315 2.09268C15.7068 1.91066 15.7456 1.71558 15.7455 1.51858C15.7455 1.32158 15.7067 1.12652 15.6312 0.944534C15.5558 0.762548 15.4452 0.597201 15.3059 0.457934C15.1666 0.318668 15.0012 0.208208 14.8192 0.132863C14.6371 0.057517 14.4421 0.0187609 14.2451 0.0188074C14.0481 0.0188538 13.853 0.0577016 13.671 0.133133C13.489 0.208564 13.3237 0.319102 13.1844 0.458435L7.88242 5.76143L2.57942 0.458435C2.44111 0.315105 2.27565 0.200756 2.09268 0.122057C1.90971 0.0433583 1.7129 0.00188689 1.51374 6.29038e-05C1.31457 -0.00176108 1.11703 0.0360986 0.932653 0.111433C0.748274 0.186767 0.580745 0.298068 0.43984 0.43884C0.298935 0.579612 0.187477 0.747037 0.111969 0.931345C0.0364604 1.11565 -0.00158556 1.31315 5.06168e-05 1.51232C0.00168679 1.71149 0.0429722 1.90834 0.121498 2.09138C0.200024 2.27443 0.314218 2.44 0.457417 2.57843L5.76242 7.88243L0.458417 13.1864C0.315218 13.3249 0.201025 13.4904 0.122499 13.6735C0.0439726 13.8565 0.00268672 14.0534 0.00105054 14.2525C-0.000585633 14.4517 0.0374603 14.6492 0.112969 14.8335C0.188477 15.0178 0.299935 15.1853 0.44084 15.326C0.581745 15.4668 0.749274 15.5781 0.933653 15.6534C1.11803 15.7288 1.31557 15.7666 1.51474 15.7648C1.7139 15.763 1.91071 15.7215 2.09368 15.6428C2.27665 15.5641 2.44211 15.4498 2.58042 15.3064L7.88242 10.0044Z"
        fill="black"
      />
    </Svg>
  );

  const MoveIcon = () => (
    <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
      <G clipPath="url(#clip0)">
        <Path d="M16 8L12.6656 4.66563V7.33437H8.66562V3.33437H11.3344L8 0L4.66563 3.33437H7.33437V7.33437H3.33437V4.66563L0 8L3.33437 11.3344V8.66562H7.33437V12.6656H4.66563L8 16L11.3344 12.6656H8.66562V8.66562H12.6656V11.3344L16 8Z" fill="black"/>
      </G>
      <ClipPath id="clip0">
        <Rect width={16} height={16} fill="white"/>
      </ClipPath>
    </Svg>
  );

  const AssignIcon = () => (
    <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
      <Path d="M7.06667 10.7L11.7667 6L10.8333 5.06667L7.06667 8.83333L5.16667 6.93333L4.23333 7.86667L7.06667 10.7ZM2 14V2H6.13333C6.27778 1.6 6.51956 1.27778 6.85867 1.03333C7.19778 0.788889 7.57822 0.666667 8 0.666667C8.42178 0.666667 8.80244 0.788889 9.142 1.03333C9.48156 1.27778 9.72311 1.6 9.86667 2H14V14H2ZM8 2.83333C8.14444 2.83333 8.264 2.786 8.35867 2.69133C8.45333 2.59667 8.50044 2.47733 8.5 2.33333C8.49956 2.18933 8.45222 2.07 8.358 1.97533C8.26378 1.88067 8.14444 1.83333 8 1.83333C7.85556 1.83333 7.73622 1.88067 7.642 1.97533C7.54778 2.07 7.50044 2.18933 7.5 2.33333C7.49956 2.47733 7.54689 2.59689 7.642 2.692C7.73711 2.78711 7.85644 2.83422 8 2.83333Z" fill="black"/>
    </Svg>
  );

  const DoneIcon = () => (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path d="M8.36364 17.2388L3.59091 11.597L2 13.4776L8.36364 21L22 4.8806L20.4091 3L8.36364 17.2388Z" fill="white"/>
    </Svg>
  );

  return (
    <View style={styles.container}>
      <View style={styles.keypadContainer}>
        {/* Number Grid */}
        <View style={styles.numberGrid}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
            <TouchableOpacity
              key={num}
              style={styles.numberBtn}
              onPress={() => handleNumberPress(num.toString())}
              activeOpacity={0.7}
            >
              <Text style={styles.numberBtnText}>{num}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Bottom Row */}
        <View style={styles.bottomRow}>
          <TouchableOpacity
            style={styles.deleteBtn}
            onPress={handleDelete}
            activeOpacity={0.7}
          >
            <DeleteIcon />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.numberBtn}
            onPress={() => handleNumberPress('0')}
            activeOpacity={0.7}
          >
            <Text style={styles.numberBtnText}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.clearBtn}
            onPress={handleClear}
            activeOpacity={0.7}
          >
            <Text style={styles.clearBtnText}>Clear</Text>
          </TouchableOpacity>
        </View>

        {/* Right Action Buttons */}
        <View style={styles.rightActions}>
          <TouchableOpacity 
            style={styles.detailsBtn}
            onPress={handleDetails}
            activeOpacity={0.7}
          >
            <Text style={styles.detailsBtnText}>Details</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.moveBtn}
            onPress={handleMove}
            activeOpacity={0.7}
          >
            <MoveIcon />
            <Text style={styles.actionBtnText}>Move</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.assignBtn}
            onPress={handleAssign}
            activeOpacity={0.7}
          >
            <AssignIcon />
            <Text style={styles.actionBtnText}>Assign</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.doneBtn}
            onPress={handleDone}
            activeOpacity={0.7}
          >
            <DoneIcon />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  keypadContainer: {
    backgroundColor: 'white',
    borderRadius: 13,
    padding: 30,
    paddingHorizontal: 17,
    width: Math.min(360, width * 0.9),
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  // Number Grid
  numberGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 6,
    marginBottom: 15,
    rowGap: 17,
  },
  numberBtn: {
    backgroundColor: '#fef6ff',
    borderWidth: 1,
    borderColor: '#f5e6ff',
    borderRadius: 6,
    height: 54,
    width: 77,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberBtnText: {
    fontSize: 20,
    fontWeight: '600',
    color: 'black',
    fontFamily: 'Roboto',
  },
  // Bottom Row
  bottomRow: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 15,
    justifyContent: 'center',
  },
  deleteBtn: {
    width: 54,
    height: 54,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#f5e6ff',
    borderRadius: 27,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearBtn: {
    backgroundColor: '#fef6ff',
    borderWidth: 1,
    borderColor: '#f5e6ff',
    borderRadius: 6,
    height: 54,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearBtnText: {
    fontSize: 20,
    fontWeight: '600',
    color: 'black',
    fontFamily: 'Roboto',
  },
  // Right Actions
  rightActions: {
    position: 'absolute',
    right: 17,
    top: 30,
    gap: 9,
  },
  detailsBtn: {
    backgroundColor: '#e5e5e5',
    borderWidth: 1,
    borderColor: '#e5e5e5',
    borderRadius: 5,
    height: 43,
    width: 77,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailsBtnText: {
    fontSize: 15,
    fontWeight: '600',
    color: 'black',
    fontFamily: 'Roboto',
  },
  moveBtn: {
    backgroundColor: '#e6f7ff',
    borderWidth: 1,
    borderColor: '#e6f7ff',
    borderRadius: 6,
    height: 70,
    width: 77,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  assignBtn: {
    backgroundColor: '#e6ffef',
    borderWidth: 1,
    borderColor: '#e6ffef',
    borderRadius: 6,
    height: 70,
    width: 77,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  actionBtnText: {
    fontSize: 15,
    fontWeight: '600',
    color: 'black',
    fontFamily: 'Roboto',
  },
  doneBtn: {
    backgroundColor: '#5f2b80',
    borderWidth: 1,
    borderColor: '#5f2b80',
    borderRadius: 6,
    height: 54,
    width: 77,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default NumericKeypad;