import pygame, math, numpy

class Drawer:
    white = (255,255,255)
    black = (0,0,0)
    red = (255,0,0)
    green = (0,255,0)
    blue = (0,0,255)

    def __init__(self):
        pygame.init()
        self.display_width = 800
        self.display_height = 600 

        self.gameDisplay = pygame.display.set_mode((self.display_width,self.display_height))

        self.farLeft = 100
        self.farRight = self.farLeft + 500
        self.topLine = 50
        self.distanceBetweenLines = 26
        self.center = math.floor((self.farRight - self.farLeft) / 2)
        self.firstLine = self.topLine + self.distanceBetweenLines*5
        self.currentNote = 60
        self.noteText = self.numToNote()
        self.noteHeight = self.getHeightOfNote()
        
    def getOctave(self):
        return math.floor(self.currentNote/12) - 1

    def numToNote(self):
        letters = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
        charPart = self.getIndexedValue(letters)
        octave = self.getOctave()
        return (charPart, octave)
    
    def getIndexedValue(self, indexArray):
        moddedAmount = self.currentNote % len(indexArray)
        for i in range(0, len(indexArray)):
            if numpy.allclose(moddedAmount, i):
                return indexArray[i]
        return indexArray[0]
    
    def getHeightOfNote(self):
        heightMod = [0, 0, 1, 1, 2, 3, 3, 4, 4, 5, 5, 6]
        octaveMod = self.getOctave() - 4
        value = self.getIndexedValue(heightMod)
        totalMod = value + octaveMod*7
        return self.firstLine - totalMod * math.floor(self.distanceBetweenLines / 2)
        
    def drawNote(self):
        lowerLimit = 61
        upperLimit = 81
        lowerLimit2 = 40
        upperLimit2 = 60
        
        pygame.draw.circle(self.gameDisplay, self.blue, [self.center, self.noteHeight], 10)
        belowOrAbove = (self.currentNote <= lowerLimit or self.currentNote >= upperLimit) and \
                       (self.currentNote <= lowerLimit2 or self.currentNote >= upperLimit2)
        
        if belowOrAbove:
            offset = 20
            pygame.draw.line(self.gameDisplay, self.blue, (self.center-offset, self.noteHeight), (self.center+offset, self.noteHeight), 3)
        
        if len(self.noteText[0]) == 2:
            positionX = self.center - 20
            if belowOrAbove:
                positionX = positionX - 10 
            self.message_display("#", positionX, self.noteHeight, 24)
        
        #pygame.draw.circle(gameDisplay, blue, [center, height-distanceBetweenLines], 10)
        
    def text_objects(self, text, font):
        textSurface = font.render(text, True, self.blue)
        return textSurface, textSurface.get_rect()
        
    def message_display(self, text, posX, posY, fontSize):
        largeText = pygame.font.Font('freesansbold.ttf',fontSize)
        TextSurf, TextRect = self.text_objects(text, largeText)
        TextRect.center = (posX, posY)
        self.gameDisplay.blit(TextSurf, TextRect)
        
    def image_display(self, locationOfImage, imageScale, position):
        image = pygame.image.load(locationOfImage)
        image = pygame.transform.scale(image, imageScale)
        self.gameDisplay.blit(image, position)
        
    def draw_board(self):
        self.image_display(r'C:\Users\fiddl\OneDrive\Documents\Senior Design\Aubio\treble-clef.png', (75, 120), (self.farLeft, 40))
        self.image_display(r'C:\Users\fiddl\Onedrive\Documents\Senior Design\Aubio\bass-clef.png', (75, 90), (self.farLeft, 205))
        self.message_display(str(self.noteText[0]) + ' ' + str(self.noteText[1]), self.center, self.topLine + self.distanceBetweenLines*12, 30)
        
        for i in range(0,10):
            height = self.topLine + self.distanceBetweenLines*i
            if i >= 5:
                height = height + self.distanceBetweenLines
            pygame.draw.line(self.gameDisplay, self.black, (self.farLeft, height), (self.farRight, height))
     
    def update_note(self, newNote):
        if newNote == 0:
            return    
        self.currentNote = newNote
        self.noteHeight = self.getHeightOfNote()
        self.noteText = self.numToNote()
    
    def kill(self):
        pygame.quit()
     
    def runGame(self):
        #drawBoardEvent = pygame.USEREVENT + 1
        #pygame.time.set_timer(drawBoardEvent, 300)
        
        #for event in pygame.event.get():
        #    if event.type == pygame.QUIT:
                #pygame.quit()
            #elif event.type == drawBoardEvent:
        #    else:
        self.gameDisplay.fill(self.white)
        self.draw_board()
        self.drawNote()
        
        #pygame.draw.circle(self.gameDisplay, self.blue, [self.center, self.topLine+self.distanceBetweenLines*5], 10)
        pygame.display.update(pygame.Rect(self.farLeft, self.topLine - self.distanceBetweenLines*2, 
                              self.farRight, self.topLine + self.distanceBetweenLines * 14))


        #pygame.display.update(pygame.Rect(display_width/2 - 50,display_height/2 - 50, display_width/2 + 50, display_height/2 + 50))

