import React from "react";
import { TextInput, View, Keyboard } from "react-native";
import {
  FormContainer,
  SubHeader,
  RoundedSelector,
  Row,
  RoundedButton,
} from "./ui";
import { AutoGrowingTextInput } from "react-native-autogrow-textinput";
import theme from "./theme";
import { Thought } from "./thoughts";

// Text input styles defined here instead of componentized to
// avoid issues with refs and subcomponents
const textInputStyle = {
  height: 48,
  backgroundColor: "white",
  padding: 12,
  paddingTop: 14,
  borderRadius: 8,
  fontSize: 16,
  borderColor: theme.lightGray,
  borderWidth: 1,
  color: theme.darkText,
};
const textInputPlaceholderColor = theme.veryLightText;

interface Props {
  thought: Thought;
  onSave: () => void;
  onSelectCognitiveDistortion: (text: string) => void;
  onTextChange: (key: string, text: string) => void;
}

export default class CBTForm extends React.Component<Props> {
  challenge: React.RefObject<TextInput>;
  alternative: React.RefObject<TextInput>;

  constructor(props) {
    super(props);

    this.challenge = React.createRef();
    this.alternative = React.createRef();
  }

  render() {
    const {
      onTextChange,
      onSelectCognitiveDistortion,
      onSave,
      thought,
    } = this.props;

    return (
      <View style={{ marginTop: 18 }}>
        <FormContainer>
          <SubHeader>Automatic Thought</SubHeader>
          <AutoGrowingTextInput
            style={textInputStyle}
            placeholderTextColor={textInputPlaceholderColor}
            placeholder={"What's going on?"}
            value={thought.automaticThought}
            returnKeyType="next"
            multiline={true}
            blurOnSubmit={true}
            onChangeText={text => onTextChange("automaticThought", text)}
          />
        </FormContainer>

        <FormContainer>
          <SubHeader>Cognitive Distortion</SubHeader>
          <RoundedSelector
            items={thought.cognitiveDistortions}
            onPress={onSelectCognitiveDistortion}
          />
        </FormContainer>

        <FormContainer>
          <SubHeader>Challenge</SubHeader>
          <AutoGrowingTextInput
            ref={this.challenge}
            blurOnSubmit={false}
            placeholder="Debate that thought!"
            placeholderTextColor={textInputPlaceholderColor}
            returnKeyType="next"
            style={textInputStyle}
            value={thought.challenge}
            onSubmitEditing={() => {
              this.alternative.current!.focus();
            }}
            onChangeText={text => {
              // We remove new lines here to avoid weird "enter" key issues
              return onTextChange("challenge", text.replace(/\n|\r/g, ""));
            }}
          />
        </FormContainer>

        <FormContainer>
          <SubHeader>Alternative Thought</SubHeader>
          <AutoGrowingTextInput
            ref={this.alternative}
            blurOnSubmit={false}
            placeholder="What should we think instead?"
            placeholderTextColor={textInputPlaceholderColor}
            returnKeyType="done"
            style={textInputStyle}
            value={thought.alternativeThought}
            onSubmitEditing={Keyboard.dismiss}
            onChangeText={text =>
              onTextChange("alternativeThought", text.replace(/\n|\r/g, ""))
            }
          />
        </FormContainer>

        <Row style={{ justifyContent: "flex-end" }}>
          <RoundedButton disabled={false} title="Save" onPress={onSave} />
        </Row>
      </View>
    );
  }
}
